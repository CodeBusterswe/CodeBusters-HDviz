import { makeAutoObservable} from "mobx";
import * as d3 from "d3";
import {select} from "d3";
import * as PCA from "./pca";

export class PlmaChartVM {
	constructor(rootStore){
		this.margin = {top: 30, right: 30, bottom: 100, left: 100};
		this.width = 950 - this.margin.left - this.margin.right;
		this.height = 800 - this.margin.top - this.margin.bottom;
		this.radius = 4;
    	this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;

		makeAutoObservable(this, {datasetStore: false, preferencesStore:false}, {autoBind: true});
	}

	get svgParent(){
		return select(".plma").select("svg");
	}
    
	get svg(){
		return select(".plma").select("svg").select(".plma-chart");
	}

	get dimensionsNames(){
		return this.preferencesStore.preferencesPlma.dimensions;
	}
	get color(){
		return this.preferencesStore.preferencesPlma.color;
	}
	renderChart(){
		this.svgParent.
			attr("width", this.width + this.margin.left + this.margin.right).
			attr("height", this.height + this.margin.top + this.margin.bottom);
		this.svg.
			attr("transform", "translate(" + (this.margin.left-100) + "," + this.margin.top + ")");
		const colorAxis = d3.scaleOrdinal(d3.schemeCategory10);
		const x = d3.scaleLinear([0, this.width]);
		const y = d3.scaleLinear([0, this.height]);
		//const xAxis = d3.axisBottom(x).ticks(6);
		//const yAxis = d3.axisLeft(y).ticks(6);
		let data = this.datasetStore.selectedData.map(d => {return {...d};});
		if(this.dimensionsNames.length<1){
			this.svg.selectAll("*").remove();
			this.svgParent.selectAll(".legend").remove();
			return;
		}
		let pc;
		let numericData = data.map(d => {
			return this.dimensionsNames.map(dim => {
				return d[dim];
			});
		});
		numericData = PCA.scale(numericData,true,true);//normalizza i dati
		pc = PCA.pca(numericData,2);
		//tutti i valori in A e B sono al contrario e vanno moltiplicati per -1
		var A = pc[0]; // valori dei dati in PCA(tutti), quindi sará M*2 dove M é il numero di dati e 2 é il numero di dimensioni
		var B = pc[1]; // autovettori(2), ogni colonna é un autovettore, quindi sará N*2 dove N é il numero di dimensioni
		//i valori che uso per tracciare si trovano sulla riga relativa a quella dimensione, es: B[i][0] e B[i][1], rispettivamente autovettore 1 e autovettore2
		  
		//console.log("-------------PCA a 2 DIMENSIONI DI RITORNO---------------")
		//console.log("value trimmed:", A);
		//console.log("autovettori trimmed:", B)
		//console.log("-----------------------------------------")
		let min, minData1, minData2, minDims2, minDims1, max, maxData1, maxData2, maxDims1, maxDims2;
		minData1 = d3.min(A.map(line => line[0]));
		minData2 = d3.min(A.map(line => line[1]));
		minDims1 = d3.min(B.map(line => line[0]*4));
		minDims2 = d3.min(B.map(line => line[1]*4));
		min = d3.min([minData1, minData2, minDims1, minDims2]);
		maxData1 = d3.max(A.map(line => line[0]));
		maxData2 = d3.max(A.map(line => line[1]));
		maxDims1 = d3.max(B.map(line => line[0]*4));
		maxDims2 = d3.max(B.map(line => line[1]*4));
		max = d3.max([maxData1, maxData2, maxDims1, maxDims2]);
		x.domain([min, max]).nice();
		y.domain([min, max]).nice();
		//x.domain([-3.5, 3.5])
		//y.domain([-3.5, 3.5])
		for (let i = 0; i < data.length; i++) {
			data[i].pc1 = isNaN(A[i][0]) ? 0 : A[i][0];
			data[i].pc2 = isNaN(A[i][1]) ? 0 : A[i][1];
		}
		let dimensions = this.dimensionsNames.
			  map(function(key, i) {
				return {
				  value: key,
				  pc1: isNaN(B[i][0]) ? 0 : B[i][0]*4,
				  pc2: isNaN(B[i][1]) ? 0 : B[i][1]*4,
				  id: i,
				};
			  });
		/*var showAxis = false;
		if (showAxis) {
			this.svg.selectAll("g").remove();
			this.svg.append("g").
				attr("class", "x axis").
				attr("transform", "translate(0," + this.height + ")").
				call(xAxis).
				append("text").
				attr("class", "label").
				attr("x", this.width).
				attr("y", -6).
				style("text-anchor", "end").
				text("PC1");
			
			this.svg.append("g").
				attr("class", "y axis").
				call(yAxis).
				append("text").
				attr("class", "label").
				attr("transform", "rotate(-90)").
				attr("y", 6).
				attr("dy", ".71em").
				style("text-anchor", "end").
				text("PC2");
		}*/
		const colorDomain = d3.extent(data, (d)=>{return +d[this.color]; });
		const palette = colorDomain[0] || colorDomain[0] === 0 ? 
			d3.scaleLinear().domain(colorDomain).range(["red", "lightblue"]) : 
			d3.scaleOrdinal(d3.schemeTableau10).domain(new Set(data.map(d => d[this.color])));
		//legenda colori
		this.svgParent.selectAll(".legend").remove();
		if(this.color){
			var legend = this.svgParent.selectAll(".legend").
				data(palette.domain()).
				enter().append("g").
				attr("class", "legend").
				attr("transform", (d, i) => { return "translate("+this.margin.left+"," + i * 20 + ")"; });
		
			legend.append("rect").
				attr("x", this.width - 18).
				attr("width", 18).
				attr("height", 18).
				style("fill", palette).
				style("stroke", "black");
			
			legend.append("text").
				attr("x", this.width - 24).
				attr("y", 9).
				attr("dy", ".35em").
				style("text-anchor", "end").
				text(function(d) {return d; });
		}
		const dragged = (event, d) =>{
			d.x = event.x;
			d.y = event.y;
			d3.select(event.subject).attr("cx", d.x).attr("cy", d.y);
			d3.select("#"+d.value+"_line").attr("x2", d.x).attr("y2", d.y);
			d3.select("#"+d.value+"_text").attr("x", d.x+10).attr("y", d.y);
			//dovrei rifare il pca con il nuovo valore
			const newPC1 = x.invert(event.x)/4, newPC2 = y.invert(event.y)/4;
			B[d.id][0] = newPC1;
			B[d.id][1] = newPC2;
			const newA = dot(numericData, B);
			data.forEach(function(d,i){
			  d.pc1 = newA[i][0];
			  d.pc2 = newA[i][1];
			});
			d3.selectAll(".dot").
				attr("cx", function(d) { return x(d.pc1); }).
				attr("cy", function(d) { return y(d.pc2); });
		};
		//assi
		this.svg.selectAll("circle.square").remove();
		this.svg.selectAll("circle.square").
			data(dimensions).
			enter().append("circle").
			attr("class", "square").
			attr("r", 7).
			attr("cx", function(d) { return x(d.pc1); }).
			attr("cy", function(d) { return y(d.pc2); }).
			style("fill", function(d) { return colorAxis(d.value); }).
			call(d3.drag().
				subject(function(){return this;}).
				on("start", dragstarted).
				on("drag", dragged).
				on("end", dragended));

		this.svg.selectAll("text.label-brand").remove();
		this.svg.selectAll("text.label-brand").
			data(dimensions).
			enter().append("text").
			attr("class", "label-brand").
			attr("id", function(d) {return d.value+"_text";}).
			attr("x", function(d) { return x(d.pc1) + 10; }).
			attr("y", function(d) { return y(d.pc2) + 0; }).
			text(function(d) { return d.value;});
		
		this.svg.selectAll("line.square").remove();
		this.svg.selectAll(".line").
			data(dimensions).
			enter().append("line").
			attr("class", "square").
			attr("id", function(d) {return d.value+"_line";}).
			attr("x1", function(d) { return x(0);}).
			attr("y1", function(d) { return y(0); }).
			attr("x2", function(d) { return x(d.pc1); }).
			attr("y2", function(d) { return y(d.pc2); }).
			style("stroke", function(d) { return colorAxis(d.value); });
			
		//punti
		this.svg.selectAll("circle.dot").remove();
		this.svg.selectAll(".dot").
			data(data).
			enter().append("circle").
			attr("class", "dot").
			attr("r", 3).
			attr("cx", function(d) { return x(d.pc1); }).
			attr("cy", function(d) { return y(d.pc2); }).
			style("fill", (d) => { return palette(d[this.color]); });
			
		function dragstarted(event, d) {
			d3.select(this).raise().attr("stroke", "black");
		}
		
		function transpose(X){
			return d3.range(X[0].length).map(function(i){
				  return X.map(function(row){ return row[i]; });
			});
			  }
			
		function dot(X,Y){
			return X.map(function(row){
				  return transpose(Y).map(function(col){
					return d3.sum(d3.zip(row,col).map(function(v){
					  return v[0]*v[1];
					}));
				  });
			});
			  }
			
		function dragended(event, d) {
			  d3.select(this).attr("stroke", null);
		}
	
	}

	colorChart(){
		let data = this.datasetStore.selectedData.map(d => {return {...d};});
		const colorDomain = d3.extent(data, (d) => {return +d[this.color]; });
		const palette = colorDomain[0] || colorDomain[0] === 0 ? 
			d3.scaleLinear().domain(colorDomain).range(["red", "lightblue"]) : 
			d3.scaleOrdinal(d3.schemeTableau10).domain(new Set(data.map(d => d[this.color])));
		this.svgParent.selectAll(".legend").remove();
		//console.log(this.color);
		if(this.dimensionsNames.length<1 || this.color === undefined){
			return;
		}
		//legenda colori
		var legend = this.svgParent.selectAll(".legend").
			data(palette.domain()).
			enter().append("g").
			attr("class", "legend").
			attr("transform", (d, i) => { return "translate("+this.margin.left+"," + i * 20 + ")"; });
		
		legend.append("rect").
			attr("x", this.width - 18).
			attr("width", 18).
			attr("height", 18).
			style("fill", palette).
			style("stroke", "black");
			
		legend.append("text").
			attr("x", this.width - 24).
			attr("y", 9).
			attr("dy", ".35em").
			style("text-anchor", "end").
			text(function(d) { return d; });
		this.svgParent.selectAll(".dot").style("fill", (d) => { return palette(d[this.color]); });
	
	}
}