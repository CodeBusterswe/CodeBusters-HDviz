import { makeAutoObservable} from "mobx";
import * as d3 from "d3";

export class SpmChartVM {
	domainByTrait={};
	yScales={};
	xScales={};
	palette;
	totalSize = 800;
	padding = 20;
	legendRectSize = 18;
	legendSpacing = 4;
	pointRadius = 4;

	constructor(rootStore){
    	this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;
		makeAutoObservable(this, {datasetStore: false, preferencesStore:false}, {autoBind: true});
	}

	get data(){
		return this.datasetStore.selectedData;
	}

	get traits(){
		return this.preferencesStore.preferencesSpm.axes.filter(axis => axis!==undefined);
	}

	get numberOfTraits(){
		return this.traits.length;
	}

	get svgParent(){
		return d3.select(".scatterplotmatrix").select("#spm-svg");
	}

	get svg(){
		return d3.select(".scatterplotmatrix").select("#spm-svg").select("g");
	}

	get svgCell(){
		return d3.select(".scatterplotmatrix").select("#spm-cell").select("g");
	}

	get canvas(){
		return d3.select(".scatterplotmatrix").select("canvas");
	}
	
	get size(){
		return this.numberOfTraits ? this.totalSize / this.numberOfTraits : this.totalSize;
	}

	get color(){
		return this.preferencesStore.preferencesSpm.color;
	}
	
	renderChart(){
		this.svgParent.
			attr("width", this.size * this.numberOfTraits + 4*this.padding + 200).
			attr("height", this.size * this.numberOfTraits + 4*this.padding);
		d3.select(".scatterplotmatrix").select("#spm-cell").
			attr("width", this.size * this.numberOfTraits + 4*this.padding + 200).
			attr("height", this.size * this.numberOfTraits + 4*this.padding);
		this.svg.
			attr("transform", "translate("+4*this.padding+","+this.padding/2+")");
		this.svgCell.
			attr("transform", "translate("+4*this.padding+","+this.padding/2+")");
		this.canvas.
			attr("width", this.size*this.numberOfTraits+4*this.padding).
			attr("height", this.size*this.numberOfTraits+4*this.padding);
		this.updateScales();
		this.updateAxis();
		this.updateColor();
		this.updatePointsCanvas();
		this.updateLegend();
	}

	//prodotto cartesiano delle dimensioni
	cross(a, b) {
		var c = [], n = a.length, m = b.length, i, j;
		for (i = -1; ++i < n;) 
			for (j = -1; ++j < m;) 
				c.push({x: a[i], 
					i: i, 
					y: b[j], 
					j: j});
		return c;
	}
	mouseenter(e){
		d3.select(e.target).selectAll("line").remove();
		d3.select(e.target).selectAll(".yText").remove();
		d3.select(e.target).selectAll(".xText").remove();
		d3.select(e.target).append("line").
			attr("class", "xLine").
			attr("y1", this.padding / 2).
			attr("y2", this.totalSize - this.padding / 2).
			style("stroke-width", 1).
			style("stroke", "red").
			style("fill", "none");
		d3.select(e.target).append("line").
			attr("class", "yLine").
			attr("x1", this.padding / 2).
			attr("x2", this.totalSize - this.padding / 2).
			style("stroke-width", 1).
			style("stroke", "red").
			style("fill", "none");
		d3.select(e.target).append("text").
			attr("class", "xText").
			attr("x", this.totalSize).
			attr("y", 200);
		d3.select(e.target).append("text").
			attr("class", "yText").
			attr("x", this.totalSize).
			attr("y", 220);
	}
	mousemove(e){
		const p = d3.select(e.target).data()[0];
		const xLine = this.svgCell.select(".xLine"), yLine = this.svgCell.selectAll(".yLine");
		if((xLine.empty() || yLine.empty()) && p && p.i !== p.j){
			this.svgCell.append("line").
				attr("class", "xLine").
				attr("y1", this.padding / 2).
				attr("y2", this.totalSize - this.padding / 2).
				style("stroke-width", 1).
				style("stroke", "red").
				style("fill", "none");
			this.svgCell.append("line").
				attr("class", "yLine").
				attr("x1", this.padding / 2). 
				attr("x2", this.totalSize - this.padding / 2). 
				style("stroke-width", 1).
				style("stroke", "red").
				style("fill", "none");
			this.svgCell.append("text").
				attr("class", "xText").
				attr("x", this.totalSize).
				attr("y", 200).
				style("fill", "red");
			this.svgCell.append("text").
				attr("class", "yText").
				attr("x", this.totalSize).
				attr("y", 220).
				style("fill", "red");
		}
		xLine.attr("x1", e.layerX-80).attr("x2", e.layerX-80);
		yLine.attr("y1", e.layerY- this.padding / 2).attr("y2", e.layerY- this.padding / 2);
		if(p){
			try{
				const dimx = p.x, dimy = p.y;
				const valx = e.layerX-(p.i*this.size+4*this.padding), valy = e.layerY-(p.j*this.size+this.padding/2);
				const realValX = this.xScales[dimx].invert(valx), realValY = this.yScales[dimy].invert(valy);
				this.svgCell.select(".xText").
					text(dimx + ": "+ realValX.toFixed(3)).
					style("fill", "red");
				this.svgCell.select(".yText").
					text(dimy + ": "+ realValY.toFixed(3)).
					style("fill", "red");
			}catch(error){
				this.svgCell.select(".xText").remove();
				this.svgCell.select(".yText").remove();
				console.log("almeno una dimensione non é numerica");
			}
		}
		if(p && p.i === p.j){
			this.svgCell.selectAll("line").remove();
			this.svgCell.select(".xText").remove();
			this.svgCell.select(".yText").remove();
		}
	}
	mouseleave(e){
		d3.select(e.target).selectAll("line").remove();
		d3.select(e.target).select(".xText").remove();
		d3.select(e.target).select(".yText").remove();
	}
	updatePointsCanvas(){
		this.svgCell.selectAll(".cell").remove();
		this.svgCell.
			on("mouseenter", (e) => this.mouseenter(e)).
			on("mousemove", (e) => this.mousemove(e)).
			on("mouseleave", (e) => this.mouseleave(e));
		let cell = this.svgCell.selectAll(".cell").
			data(this.cross(this.traits, this.traits)).
			enter().append("g").
			attr("class", "cell").
			attr("transform", (d) => {
				return "translate(" + d.i*this.size + "," + d.j*this.size + ")";
			}).
			each((d, i, list) => this.draw(d, i, list));

		//aggiunge label alle cell centrali
		cell.filter(function(d) { return d.i === d.j; }).
			append("text").
			attr("x", 25).
			attr("y", this.size/2).
			style("fill", "#992600").
			text(function(d) { return d.x; });
	}
	draw(p, i , list){
		let cell = d3.select(list[i]);
		cell.append("rect").
			attr("class", "frame").
			attr("x", this.padding / 2).
			attr("y", this.padding / 2).
			style("pointer-events","visible").
			attr("width", this.size - this.padding).
			attr("height", this.size - this.padding);
		let ctx = this.canvas.node().getContext("2d");
		ctx.resetTransform();
		ctx.transform(1, 0, 0, 1, p.i*this.size+4*this.padding, p.j*this.size+this.padding/2);

		//disegna i punti
		if(p.i !== p.j){
			this.data.forEach(d => {
				ctx.beginPath();
				ctx.arc(this.xScales[p.x](d[p.x]), this.yScales[p.y](d[p.y]), this.pointRadius, 0, 2*Math.PI);
				ctx.closePath();
				ctx.fillStyle = this.palette(d[this.color]);
				ctx.fill();
			});
		}
		
	}
	
	updateColor(){
		let colorDomain = d3.extent(this.data, (d) => {return +d[this.color]; });
		if(colorDomain[0] || colorDomain[0] === 0)
			this.palette = d3.scaleLinear().domain(colorDomain).range(["yellow", "blue"]);//
		else{
			this.palette = d3.scaleOrdinal(d3.schemeCategory10);
		}
	}
	
	updateScales(){
		this.traits.forEach(t => {
			this.domainByTrait[t] = d3.extent(this.data, function(d) { return +d[t]; });
			let xScale, yScale;
			if(this.domainByTrait[t][0] || this.domainByTrait[t][0]===0){//controllo se il minore è un numero
				xScale=d3.scaleLinear().domain(this.domainByTrait[t]);
				yScale=d3.scaleLinear().domain(this.domainByTrait[t]);
			}else{
				let domain = this.data.map(l => l[t]);
				xScale=d3.scalePoint().domain([...new Set(domain)]);
				yScale=d3.scalePoint().domain([...new Set(domain)]);
			}
			xScale.range([this.padding / 2, this.size - this.padding / 2]);
			yScale.range([this.size - this.padding / 2, this.padding / 2]);
			this.xScales[t]=xScale;
			this.yScales[t]=yScale;
		  });
	}
	
	updateAxis(){
		this.svg.selectAll(".x.axis").remove();
		this.svg.selectAll(".x.axis").
			data(this.traits).
			enter().append("g").
			attr("class", "x axis").
			attr("transform", (d, i) => { return "translate("+this.size*i+",0)"; }).
			each((d, i, list) => {
				let x_axis = d3.axisBottom(this.xScales[d]).
					ticks(6).
					tickSize(this.size * this.numberOfTraits);
				d3.select(list[i]).call(x_axis);
			});

		this.svg.selectAll(".y.axis").remove();
		this.svg.selectAll(".y.axis").
			data(this.traits).
			enter().append("g").
			attr("class", "y axis").
			attr("transform", (d, i) => { return "translate(0,"+this.size*i+")"; }).
		    each((d, i, list) => {
				let y_axis = d3.axisLeft(this.yScales[d]).
					ticks(6).
					tickSize(-this.size * this.numberOfTraits);
				d3.select(list[i]).call(y_axis); 
			});
	}
	
	updateLegend(){
		this.svg.selectAll(".legend").remove();
		if(!this.color){return;}
		let legend = this.svg.selectAll(".legend").
			data(this.palette.domain()).
			enter().
			append("g").
			attr("class", "legend").
			attr("transform", (d, i) => {
				var height = this.legendRectSize + this.legendSpacing;
				var offset = this.padding;
				var horz = this.size * this.numberOfTraits + this.padding;
				var vert = i * height + offset;
				return "translate(" + horz + "," + vert + ")";
			});
		legend.append("rect").
			attr("width", this.legendRectSize).
			attr("height", this.legendRectSize).
			style("fill", this.palette).
			style("stroke", "black");
     
		legend.append("text").
			attr("x", this.legendRectSize + this.legendSpacing).
			attr("y", this.legendRectSize - this.legendSpacing).
			text((d) => {
				return d;
			});

	}
}
