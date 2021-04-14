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

    	this.svgParent.
    		attr("width", this.width + this.margin.left + this.margin.right).
    		attr("height", this.height + this.margin.top + this.margin.bottom);
    		
    	this.svg.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    	makeAutoObservable(this, {datasetStore: false, preferencesStore:false}, {autoBind: true});
    }

    get columns(){
    	return new Set(this.data.map(d => d[this.asseX]));
    }

    get rows(){
    	return new Set(this.data.map(d => d[this.asseY]));
    }

    get asseX(){
    	return this.preferencesStore.preferencesHm.xAxis;
    }

    get asseY(){
    	return this.preferencesStore.preferencesHm.yAxis;
    }

    get heat(){
    	return this.preferencesStore.preferencesHm.heat;
    }

    get svgParent(){
    	return d3.select(".heatmap").select("svg");
    }

    get div(){
    	return d3.select(".heatmap");
    }

    get svg(){
    	return d3.select(".heatmap").select("svg").select("g");
    }

    get xAxis(){
    	return d3.select(".heatmap").select("svg").select("g").select("#x-axis");
    }

    get yAxis(){
    	return d3.select(".heatmap").select("svg").select("g").select("#y-axis");
    }

    prepareData(){
    	let newData = [];
    	if(+this.data[0][this.heat]){
    		this.data.forEach(d => {
    			let notFound = true;
    			newData.forEach(x => {
    				if(d[this.asseX] === x[this.asseX] && d[this.asseY] === x[this.asseY]){
    					notFound = false;
    					x[this.heat] = ((d[this.heat]+x[this.heat])/2).toFixed(3);
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
    	return newData;
    }

    renderChart(){
    	let newData = this.prepareData();
		    	
    	d3.selectAll("rect").remove();

    	console.log(this.colums);
    	
    	// Build X scales and axis:
    	const x = d3.scaleBand().
    		range([ 0, this.width ]).
    		domain(this.columns).
    		padding(0.05);

    	this.xAxis.
    		style("font-size", 15).
    		attr("transform", "translate(0," + this.height + ")").
    		call(d3.axisBottom(x).tickSize(0)).
    		select(".domain").remove();

    	// Build Y scales and axis:
    	const y = d3.scaleBand().
    		range([ this.height, 0 ]).
    		domain(this.rows).
    		padding(0.05);

    	this.yAxis.
    		style("font-size", 15).
    		call(d3.axisLeft(y).tickSize(0)).
    		select(".domain").remove();

    	// create a tooltip
    	this.div.select("div").remove();
    	const tooltip = this.div.
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
    	const mousemove = (event,d) => {
    		var matrix = event.currentTarget.getScreenCTM().
    			translate(+ event.currentTarget.getAttribute("cx"), + event.currentTarget.getAttribute("cy"));
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
    	let colorDomain = d3.extent(this.data, (d) => { return +d[this.heat]; });
    	let myColor;
    	if(colorDomain[0])
    		myColor = d3.scaleSequential().
    			interpolator(d3.interpolateInferno).
    			domain(colorDomain);
    	else{
    		myColor = d3.scaleOrdinal(d3.schemeCategory10);
    	}

    	console.log(this.svg);

    	this.svg.selectAll().
    		data(newData).
    		enter().
    		append("rect").
    		attr("x", (d) => { return x(d[this.asseX]); }).
    		attr("y", (d) => { return y(d[this.asseY]); }).
    		attr("rx", 4).
    		attr("ry", 4).
    		attr("width", x.bandwidth() ).
    		attr("height", y.bandwidth() ).
    		style("fill", (d) => { return myColor(d[this.heat]);} ).
    		style("stroke-width", 4).
    		style("stroke", "none").
    		style("opacity", 0.8).
    		on("mouseover", mouseover).
    		on("mousemove", mousemove).
    		on("mouseleave", mouseleave);
    }
	
}