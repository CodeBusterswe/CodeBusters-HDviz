import { computed, makeObservable, observable } from "mobx";
import * as d3 from "d3";
import {select} from "d3";

export class SpmChartVM {

	domainByTrait={};
	yScales={};
	xScales={};
	palette;
	canvas;
	ctx;
	totalSize = 800;
	padding = 20;
	legendRectSize = 18;
	legendSpacing = 4;
	pointRadius = 2;

	constructor(rootStore){
    	this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;
		this.renderChart = this.renderChart.bind(this);
		this.updatePointsCanvas = this.updatePointsCanvas.bind(this);
		this.draw = this.draw.bind(this);
		this.updateColor = this.updateColor.bind(this);
		this.updateLegend = this.updateLegend.bind(this);
		this.updateAxis = this.updateAxis.bind(this);
		this.updateScales = this.updateScales.bind(this);

    	makeObservable(this,{
			preferencesStore : observable,
			color : computed,
			data : computed,
			traits : computed,
			numberOfTraits : computed,
			size : computed
    	});
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

	get size(){
		return this.numberOfTraits ? this.totalSize / this.numberOfTraits : this.totalSize;
	}

	get color(){
		return this.preferencesStore.preferencesSpm.color;
	}

	get axes(){
		return this.preferencesStore.preferencesSpm.axes;
	}
	
	renderChart(){		
		console.log(this);
		select(".scatterplotmatrix").
			selectAll("svg").remove();
		select(".scatterplotmatrix").
			selectAll("canvas").remove();
		const svg = select(".scatterplotmatrix").
			append("svg").
			attr("class", "plot").
			attr("id", "spm-svg").
			attr("width", this.size * this.numberOfTraits + 4*this.padding + 200).
			attr("height", this.size * this.numberOfTraits + 4*this.padding).
			append("g").
			attr("transform", "translate("+4*this.padding+","+this.padding/2+")");
		
		this.canvas = select(".scatterplotmatrix").
			append("canvas").
			attr("class", "plot").
			attr("id", "spm-canvas").
			attr("width", this.size*this.numberOfTraits+4*this.padding).
			attr("height", this.size*this.numberOfTraits+4*this.padding);
		this.updateScales();
		this.updateAxis(svg);
		//this.updateColor();
		this.updatePointsCanvas(svg);
		//if(this.color)
		//this.updateLegend(svg);
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

	updatePointsCanvas(svg){
		svg.selectAll(".cell").remove();
		let cell = svg.selectAll(".cell").
			data(this.cross(this.traits, this.traits)).
			enter().append("g").
			attr("class", "cell").
			attr("transform", function(d) {
				return "translate(" + d.i*this.size + "," + d.j*this.size + ")";
			}).
			each(this.draw);
		//aggiunge label alle cell centrali
		cell.filter(function(d) { return d.i === d.j; }). 
			append("text").
			attr("x", 25).
			attr("y", this.size/2).
			style("fill", "#992600").
			text(function(d) { return d.x; });
	}
	
	draw(p) {
		let cell = select(this);
		cell.append("rect").
			attr("class", "frame").
			attr("x", this.padding / 2).
			attr("y", this.padding / 2).
			attr("width", this.size - this.padding).
			attr("height", this.size - this.padding);
		this.ctx = this.canvas.node().getContext("2d");
		this.ctx.resetTransform();
		this.ctx.transform(1, 0, 0, 1, p.i*this.size+4*this.padding, p.j*this.size+this.padding/2);

		//disegna i punti
		if(p.i !== p.j){
			this.data.forEach(d => {
				this.ctx.beginPath();
				this.ctx.arc(this.xScales[p.x](d[p.x]), this.yScales[p.y](d[p.y]), this.pointRadius, 0, 2*Math.PI);
				this.ctx.closePath();
				this.ctx.fillStyle = this.palette(d[this.color]);
				this.ctx.fill();
			});
		}
		
	}
	
	updateColor(){
		let colorDomain = d3.extent(this.data, function(d) {console.log(this, this.color); return d[this.color]; });
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
	
	updateAxis(svg){
		svg.selectAll(".x.axis").remove();
		svg.selectAll(".x.axis").
			data(this.traits).
			enter().append("g").
			attr("class", "x axis").
			attr("transform", function(d, i) { return "translate("+this.size*i+",0)"; }).
			each(function(d){
				let x_axis = d3.axisBottom(this.xScales[d]).
					ticks(6).
					tickSize(this.size * this.numberOfTraits);
				select(this).call(x_axis); 
			});

		svg.selectAll(".y.axis").remove();
		svg.selectAll(".y.axis").
			data(this.traits).
			enter().append("g").
			attr("class", "y axis").
			attr("transform", function(d, i) { return "translate(0,"+this.size*i+")"; }).
			each(function(d) {
				let y_axis = d3.axisLeft(this.yScales[d]).
					ticks(6).
					tickSize(-this.size * this.numberOfTraits);
				select(this).call(y_axis); 
			});
	}
	
	updateLegend(svg){
		svg.selectAll(".legend").remove();
		let legend = svg.selectAll(".legend").
			data(this.palette.domain()).
			enter().
			append("g").
			attr("class", "legend").
			attr("transform", function (d, i) {
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
			text(function (d) {
				return d;
			});

	}
}
