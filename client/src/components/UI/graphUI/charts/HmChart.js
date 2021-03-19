import React, {useEffect} from "react";
import * as d3 from "d3";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
const HeatMap = () => {
	const viewModel = useStore();
	const data = viewModel.getSelectedData();
	const dims = viewModel.getCheckedDimensions();
	const preferences = viewModel.getHmPreferences();
	const asseX = preferences[0], asseY = preferences[1], fillDati = preferences[2]
	let columns = new Set(data.map(d => d[asseX]))
	let rows = new Set(data.map(d => d[asseY]))

	useEffect(() => {
		
		let newData = [];
		let notFound = true;
		let val;
		if(+data[0][fillDati]){
			console.log("numerico")
			data.forEach(d => {
				notFound = true
				newData.forEach(x => {
					if(d[asseX] === x[asseX] && d[asseY] === x[asseY]){
						notFound = false;
						x[fillDati] = (d[fillDati]+x[fillDati])/2
						return;
					}
				})
				if(notFound){
					newData.push(d);
				}
			});
		}else{
			console.log("categorico")
			data.forEach(d => {
				notFound = true
				newData.forEach(x => {
					if(d[asseX] === x[asseX] && d[asseY] === x[asseY])
						notFound = false;
				})
				if(notFound){
					newData.push(d);
				}
			});
		}
		console.log(newData)
		// set the dimensions and margins of the graph
		const margin = {top: 30, right: 30, bottom: 100, left: 100},
			width = 850 - margin.left - margin.right,
			height = 850 - margin.top - margin.bottom;
  
		// append the svg object to the body of the page
		d3.select(".heatmap").selectAll("svg").remove();
		const svg = d3.select(".heatmap").
			append("svg").
			attr("width", width + margin.left + margin.right).
			attr("height", height + margin.top + margin.bottom).
			append("g").
			attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");
  
		// Labels of row and columns
		//const columns = ["Paolo", "Michele", "Giacomo", "Marco", "AleRago", "AlePirolo","Hossain"]
		//const rows = ["Paolo","Michele", "Giacomo", "Marco", "AleRago", "AlePirolo","Hossain"]
  
		// Build X scales and axis:
		const x = d3.scaleBand().
			range([ 0, width ]).
			domain(columns).
			padding(0.05);
		svg.append("g").
			style("font-size", 15).
			attr("transform", "translate(0," + height + ")").
			call(d3.axisBottom(x).tickSize(0)).
			select(".domain").remove()

		// Build Y scales and axis:
		const y = d3.scaleBand().
			range([ height, 0 ]).
			domain(rows).
			padding(0.05);
		svg.append("g").
			style("font-size", 15).
			call(d3.axisLeft(y).tickSize(0)).
			select(".domain").remove()
  
		// create a tooltip
		const tooltip = d3.select(".heatmap").
			append("div").
			style("opacity", 0).
			attr("class", "tooltip").
			style("position", "absolute").
			style("background-color", "white").
			style("border", "solid").
			style("border-width", "2px").
			style("border-radius", "5px").
			style("padding", "5px")
		// Three function that change the tooltip when user hover / move / leave a cell
		const mouseover = function(event,d) {
			tooltip.
				style("opacity", 1)
			d3.select(this).
				style("stroke", "black").
				style("opacity", 1)
		}
		const mousemove = function(event,d) {
			var matrix = this.getScreenCTM().
				translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
			tooltip.
				html("The exact value of<br>this cell is: " + d[fillDati]).
				style("left", d3.pointer(event)[0] + matrix.e + 15 + "px").
				style("top", d3.pointer(event)[1] + 100 + "px")
		}
		const mouseleave = function(event,d) {
			tooltip.
				style("opacity", 0)
			d3.select(this).
				style("stroke", "none").
				style("opacity", 0.8)
		}
  		// Build color scale

		let colorDomain = d3.extent(data, function(d) {return +d[fillDati]; });
		let myColor;
		if(colorDomain[0])
			myColor = d3.scaleSequential().
				interpolator(d3.interpolateInferno).
				domain(colorDomain);
		else{
			myColor = d3.scaleOrdinal(d3.schemeCategory10);
		}

		svg.selectAll().
			// eslint-disable-next-line quotes
			data(newData).
			enter().
			append("rect").
			attr("x", function(d) {	return x(d[asseX]) }).
			attr("y", function(d) { return y(d[asseY]) }).
			attr("rx", 4).
			attr("ry", 4).
			attr("width", x.bandwidth() ).
			attr("height", y.bandwidth() ).
			style("fill", function(d) { return myColor(d[fillDati])} ).
			style("stroke-width", 4).
			style("stroke", "none").
			style("opacity", 0.8).
			on("mouseover", mouseover).
			on("mousemove", mousemove).
			on("mouseleave", mouseleave)

	});

	return (
		<div className="heatmap">
		</div>
	)

}
export default observer(HeatMap);