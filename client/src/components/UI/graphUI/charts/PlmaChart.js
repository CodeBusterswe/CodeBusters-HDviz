import React, {useEffect} from "react";
import * as d3 from "d3";
import { useStore } from "../../../../ContextProvider";
import { select } from "d3";
import { observer } from "mobx-react-lite";
import * as PCA from "./pca";
const Plma = () => {
	const viewModel = useStore(),
		data = viewModel.getSelectedData().map(d => {return {...d};}),
		[dimensionsNames, color]=viewModel.getPlmaPreferences(),
		margin = {top: 30, right: 30, bottom: 100, left: 100},
		width = 1400 - margin.left - margin.right,
		height = 900 - margin.top - margin.bottom,
		radius = 4;

	useEffect(() => {
		if(dimensionsNames.length<1){
			select(".plma").selectAll("svg").remove();
			return;
		}
		const colorAxis = d3.scaleOrdinal(d3.schemeCategory10);
		const x = d3.scaleLinear([0, width]);
		const y = d3.scaleLinear([0, height]);
		const xAxis = d3.axisBottom(x).ticks(6);
		const yAxis = d3.axisLeft(y).ticks(6);
		select(".plma").selectAll("svg").remove();
		select("plma").selectAll("text").remove();
			
		const svg = select(".plma").
			append("svg").
			attr("class", "plot").
			attr("id", "plma-svg").
			attr("width", width + margin.left + margin.right).
			attr("height", height + margin.top + margin.bottom).
			append("g").
			attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		let pc;
		let numericData = data.map(d => {
			return dimensionsNames.map(dim => {
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
		x.domain(d3.extent(A.map(line => line[0]))).nice();
		y.domain(d3.extent(A.map(line => line[1]))).nice();
		//x.domain([-3.5, 3.5])
		//y.domain([-3.5, 3.5])
		for (let i = 0; i < data.length; i++) {
			data[i].pc1 = isNaN(A[i][0]) ? 0 : A[i][0];
			data[i].pc2 = isNaN(A[i][1]) ? 0 : A[i][1];
		}
		let dimensions = dimensionsNames.
			  map(function(key, i) {
				return {
				  value: key,
				  pc1: isNaN(B[i][0]) ? 0 : B[i][0]*4,
				  pc2: isNaN(B[i][1]) ? 0 : B[i][1]*4,
				  id: i,
				};
			  });
		var showAxis = false;
		if (showAxis) {
			svg.append("g").
				attr("class", "x axis").
				attr("transform", "translate(0," + height + ")").
				call(xAxis).
				append("text").
				attr("class", "label").
				attr("x", width).
				attr("y", -6).
				style("text-anchor", "end").
				text("PC1");
			
			svg.append("g").
				attr("class", "y axis").
				call(yAxis).
				append("text").
				attr("class", "label").
				attr("transform", "rotate(-90)").
				attr("y", 6).
				attr("dy", ".71em").
				style("text-anchor", "end").
				text("PC2");
		}
		const colorDomain = d3.extent(data, function(d) {return +d[color]; });
		const palette = colorDomain[0] || colorDomain[0] === 0 ? 
			d3.scaleLinear().domain(colorDomain).range(["red", "lightblue"]) : 
			d3.scaleOrdinal(d3.schemeTableau10).domain(new Set(data.map(d => d[color])));
		//legenda colori
		svg.selectAll(".legend").remove();
		var legend = svg.selectAll(".legend").
			data(palette.domain()).
			enter().append("g").
			attr("class", "legend").
			attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
		
		legend.append("rect").
			attr("x", width - 18).
			attr("width", 18).
			attr("height", 18).
			style("fill", palette).
			style("stroke", "black");
			
		legend.append("text").
			attr("x", width - 24).
			attr("y", 9).
			attr("dy", ".35em").
			style("text-anchor", "end").
			text(function(d) { console.log(d);return d; });
		//punti sopra agli assi
		svg.selectAll("circle.brand").
			data(dimensions).
			enter().append("circle").
			attr("class", "square").
			attr("r", 7).
			attr("cx", function(d) { return x(d.pc1); }).
			attr("cy", function(d) { return y(d.pc2); }).
			style("fill", function(d) { return colorAxis(d.value); }).
			call(d3.drag().
				on("start", dragstarted).
				on("drag", dragged).
				on("end", dragended));

		svg.selectAll("text.brand").
			data(dimensions).
			enter().append("text").
			attr("class", "label-brand").
			attr("id", function(d) {return d.value+"_text";}).
			attr("x", function(d) { return x(d.pc1) + 10; }).
			attr("y", function(d) { return y(d.pc2) + 0; }).
			text(function(d) { return d.value;});
			  
		svg.selectAll(".line").
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
		svg.selectAll(".dot").
			data(data).
			enter().append("circle").
			attr("class", "dot").
			attr("r", 3).
			attr("cx", function(d) { return x(d.pc1); }).
			attr("cy", function(d) { return y(d.pc2); }).
			style("fill", function(d) { return palette(d[color]); });
			
		function dragstarted(event, d) {
			d3.select(this).raise().attr("stroke", "black");
		}
			
		function dragged(event, d) {
			d.x = event.x;
			d.y = event.y;
			d3.select(this).attr("cx", d.x).attr("cy", d.y);
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
		
	}, [dimensionsNames]);
	useEffect(() => {
		const colorDomain = d3.extent(data, function(d) {return +d[color]; });
		const palette = colorDomain[0] || colorDomain[0] === 0 ? 
			d3.scaleLinear().domain(colorDomain).range(["red", "lightblue"]) : 
			d3.scaleOrdinal(d3.schemeTableau10).domain(new Set(data.map(d => d[color])));
		const svg = select(".plma").select("svg");
		//legenda colori
		svg.selectAll(".legend").remove();
		var legend = svg.selectAll(".legend").
			data(palette.domain()).
			enter().append("g").
			attr("class", "legend").
			attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
		
		legend.append("rect").
			attr("x", width - 18).
			attr("width", 18).
			attr("height", 18).
			style("fill", palette).
			style("stroke", "black");
			
		legend.append("text").
			attr("x", width - 24).
			attr("y", 9).
			attr("dy", ".35em").
			style("text-anchor", "end").
			text(function(d) { console.log(d);return d; });
		svg.selectAll(".dot").style("fill", function(d) { return palette(d[color]); });
	}, [color]);
	return(
		<div className="plma">
		</div>
	);
};
export default observer(Plma);