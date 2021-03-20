import React, {useEffect} from "react";
import * as d3 from "d3";
import { useStore } from "../../../../ContextProvider";
import { select } from "d3";
import { observer } from "mobx-react-lite";

const AdjacencyMatrix = () => {
	const viewModel = useStore(),
		distanceMatrix = viewModel.getDistanceMatrices(),
		[matrixName, orderBy, dimLabels]=viewModel.getAmPreferences(),
		margin = {top: 30, right: 30, bottom: 100, left: 100},
		width = 850 - margin.left - margin.right,
		height = 850 - margin.top - margin.bottom;
	
	useEffect(() => {
		d3.select(".adjacencyMatrix").selectAll("svg").remove();
		const svg = select(".adjacencyMatrix").
			append("svg").
			attr("width", width + margin.left + margin.right).
			attr("height", height + margin.top + margin.bottom);
		//const colors = d3.scaleLinear(d3.schemeTableau10);
		let dm = {}, nodes = [], links= [];
		if(matrixName){
			dm = distanceMatrix[matrixName];
			nodes = dm.nodes; 
			links = dm.links;
		}
		
		nodes.sort(function(x, y){
			return d3.ascending(x[orderBy], y[orderBy]);
			 })
		const colors = d3.scaleSequential().
			interpolator(d3.interpolateBlues).
			domain(d3.extent(links.map(l => l.value)));
		
		let linkHash = {};
		links.forEach(edge =>{
			let id = edge.source + "-" + edge.target
			linkHash[id] = edge
		})

		var matrix = []
		for (let i = 0; i < nodes.length; i++) {
			for (let j = 0; j < nodes.length; j++) {
				let grid = {id: nodes[i].id+"-"+nodes[j].id, x: i, y: j, value: 0}
				if(linkHash[grid.id]){ //esiste
					grid.value = linkHash[grid.id].value; //value=2
				}else{
					var split = grid.id.split("-");
					let correct = split[1]+ "-" + split[0];
					if(split[1]!==split[0]){
						grid.value = linkHash[correct].value;
					}
				}
				matrix.push(grid)
			}
		}
		const scale = d3.scaleBand().
			domain(nodes.map(d => d.id)).
			range([ 0, width]);
    
		//console.log(matrix)
		svg.append("g").
			attr("transform","translate(50,50)").
			attr("id","adjacencyG").
			selectAll("rect").
			data(matrix).
			enter().
			append("rect").
			attr("class","grid").
			attr("width", scale.bandwidth()).
			attr("height",scale.bandwidth()).
			attr("x", d=> d.x*scale.bandwidth()).
			attr("y", d=> d.y*scale.bandwidth()).
			style("fill", d => colors(d.value)).
			//style("fill-opacity", d=> d.value * .2).
			style("stroke-width", 4).
			style("stroke", "none").
			style("opacity", 0.8);
    
		svg.
			append("g").
			attr("transform","translate(50,45)"). 
			selectAll("text").
			data(nodes).
			enter().
			append("text").attr("transform","rotate(-90)").
			attr("y", (d,i) => i * scale.bandwidth() + scale.bandwidth()/2).
			text(d => d[dimLabels]).
			style("text-anchor","start").
			style("font-size","10px")        
    
		svg.
			append("g").attr("transform","translate(45,50)").
			selectAll("text").
			data(nodes).
			enter().
			append("text").
			attr("y",(d,i) => i * scale.bandwidth() + scale.bandwidth()/2).
			text(d => d[dimLabels]).
			style("text-anchor","end").
			style("font-size","10px")

		d3.selectAll("rect").on("mouseover", gridOver); 

		function gridOver(event,d) {
			d3.selectAll("rect").style("stroke-width", function(p) { return p.x === d.x || p.y === d.y ? "3px" : "1px"});
		}
	});

	return (
		<div className="adjacencyMatrix">
		</div>
	)
}
export default observer(AdjacencyMatrix);