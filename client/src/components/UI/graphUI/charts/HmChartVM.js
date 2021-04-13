import { makeAutoObservable} from "mobx";
import * as d3 from "d3";

export class HmChartVM {
	 	
    margin = {top: 30, right: 30, bottom: 100, left: 100};
    width = 850 - this.margin.left - this.margin.right;
    height = 850 - this.margin.top - this.margin.bottom;

    constructor(rootStore){
    	this.datasetStore = rootStore.datasetStore;
    	this.preferencesStore = rootStore.preferencesStore;

    	this.data = this.datasetStore.selectedData;
    	this.asseX = this.preferencesStore.preferencesHm.xAxis;
    	this.asseY = this.preferencesStore.preferencesHm.yAxis;
    	this.heat = this.preferencesStore.preferencesHm.heat;
    	this.columns = new Set(this.data.map(d => d[this.asseX]));
    	this.rows = new Set(this.data.map(d => d[this.asseY]));

    	makeAutoObservable(this, {datasetStore: false, preferencesStore:false}, {autoBind: true});
    }

    renderChart(){
    //prepara i dati, elimina i doppioni in caso di dati categorici, fa la media altrimenti
    	let newData = [];
    	if(+this.data[0][this.heat]){
    		this.data.forEach(d => {
    			let notFound = true;
    			newData.forEach(x => {
    				if(d[this.asseX] === x[this.asseX] && d[this.asseY] === x[this.asseY]){
    					notFound = false;
    					x[this.heat] = (d[this.heat]+x[this.heat])/2;
    					return;
    				}
    			});
    			if(notFound){
    				newData.push(d);
    			}
    		});
    	}else{
    		this.data.forEach(d => {
    			let notFound = true;
    			newData.forEach(x => {
    				if(d[this.asseX] === x[this.asseX] && d[this.asseY] === x[this.asseY])
    					notFound = false;
    			});
    			if(notFound){
    				newData.push(d);
    			}
    		});
    	}
    	// append the svg object to the body of the page
    	d3.select(".heatmap").selectAll("svg").remove();
    	const svg = d3.select(".heatmap").
    		append("svg").
    		attr("width", this.width + this.margin.left + this.margin.right).
    		attr("height", this.height + this.margin.top + this.margin.bottom).
    		append("g").
    		attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    	// Build X scales and axis:
    	const x = d3.scaleBand().
    		range([ 0, this.width ]).
    		domain(this.columns).
    		padding(0.05);
    	svg.append("g").
    		style("font-size", 15).
    		attr("transform", "translate(0," + this.height + ")").
    		call(d3.axisBottom(x).tickSize(0)).
    		select(".domain").remove();

    	// Build Y scales and axis:
    	const y = d3.scaleBand().
    		range([ this.height, 0 ]).
    		domain(this.rows).
    		padding(0.05);
    	svg.append("g").
    		style("font-size", 15).
    		call(d3.axisLeft(y).tickSize(0)).
    		select(".domain").remove();

    	// create a tooltip
    	d3.select(".heatmap").select("div").remove();
    	const tooltip = d3.select(".heatmap").
    		append("div").
    		style("opacity", 0).
    		attr("class", "tooltip").
    		style("position", "absolute").
    		style("background-color", "white").
    		style("border", "solid").
    		style("border-width", "2px").
    		style("border-radius", "5px").
    		style("padding", "5px");
    	// Three function that change the tooltip when user hover / move / leave a cell
    	const mouseover = function(event,d) {
    		tooltip.
    			style("opacity", 1);
    		d3.select(this).
    			style("stroke", "black").
    			style("opacity", 1);
    	};
    	const mousemove = function(event,d) {
    		var matrix = this.getScreenCTM().
    			translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
    		tooltip.
    			html("The exact value of<br>this cell is: " + d[this.heat]).
    			style("left", d3.pointer(event)[0] + matrix.e + 15 + "px").
    			style("top", d3.pointer(event)[1] + 100 + "px");
    	};
    	const mouseleave = function(event,d) {
    		tooltip.
    			style("opacity", 0);
    		d3.select(this).
    			style("stroke", "none").
    			style("opacity", 0.8);
    	};
    	// Build color scale

    	let colorDomain = d3.extent(this.data, function(d) {return +d[this.heat]; });
    	let myColor;
    	if(colorDomain[0])
    		myColor = d3.scaleSequential().
    			interpolator(d3.interpolateInferno).
    			domain(colorDomain);
    	else{
    		myColor = d3.scaleOrdinal(d3.schemeCategory10);
    	}

    	svg.selectAll().
    		data(newData).
    		enter().
    		append("rect").
    		attr("x", function(d) {	return x(d[this.asseX]); }).
    		attr("y", function(d) { return y(d[this.asseY]); }).
    		attr("rx", 4).
    		attr("ry", 4).
    		attr("width", x.bandwidth() ).
    		attr("height", y.bandwidth() ).
    		style("fill", function(d) { return myColor(d[this.heat]);} ).
    		style("stroke-width", 4).
    		style("stroke", "none").
    		style("opacity", 0.8).
    		on("mouseover", mouseover).
    		on("mousemove", mousemove).
    		on("mouseleave", mouseleave);
    }
	
}