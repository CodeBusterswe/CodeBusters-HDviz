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
		const colors = d3.scaleSequential().
			interpolator(d3.interpolateBlues).
			domain(d3.extent(links.map(l => l.value)));
			/*
		nodes.sort(function(x, y){
			return d3.ascending(x[orderBy], y[orderBy]);
			 })
		console.log(nodes);*/
		/*
		
		let nodes = `id,group,salary
Paolo,A,800
Michele,A,1500
AleRago,A,2560
AlePirolo,A,900
Marco,A,1000
Giacomo,A,3000
Hossain,A,4568`

		let links = `source,target,value
Paolo,Michele,2
Paolo,Giacomo,2.23606797749979
Paolo,Marco,3.1622776601683795
Paolo,AleRago,0
Paolo,AlePirolo,5.0990195135927845
Paolo,Hossain,6.082762530298219
Michele,Giacomo,22.02271554554524
Michele,Marco,0
Michele,AleRago,24.020824298928627
Michele,AlePirolo,25.019992006393608
Michele,Hossain,26.019223662515376
Giacomo,Marco,2.23606797749979
Giacomo,AleRago,2
Giacomo,AlePirolo,3
Giacomo,Hossain,4.47213595499958
Marco,AleRago,2.23606797749979
Marco,AlePirolo,2.8284271247461903
Marco,Hossain,3
AleRago,AlePirolo,1
AleRago,Hossain,2.8284271247461903
AlePirolo,Hossain,2.23606797749979`

		links = d3.csvParse(links);
		nodes = d3.csvParse(nodes);
*/
		
		let linkHash = {};
		links.forEach(edge =>{
			let id = edge.source + "-" + edge.target
			linkHash[id] = edge
		})
		//console.log(nodes)

		var matrix = []

		nodes.forEach((source, a) => {
			nodes[a].id = a;
			console.log(a);
			nodes.forEach((target, b) => {
				var grid = {id: "node"+ a + "-node"+ b, x: b, y: a, value: 0}; //id: Paolo-Michele /Michele-Paolo
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
			})
		})
		console.log(nodes)
		console.log(links)
		console.log(matrix)

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