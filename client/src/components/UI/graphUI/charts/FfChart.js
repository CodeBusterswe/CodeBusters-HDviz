import React, {useEffect, useRef} from "react";
import * as d3 from "d3";
import { useStore } from "../../../../ContextProvider";
import { select } from "d3";
import { observer } from "mobx-react-lite";
const ForceField = () => {
	const viewModel = useStore(),
		distanceMatrix = viewModel.getDistanceMatrices(),
		[matrixName, color]=viewModel.getFfPreferences(),
		margin = {top: 30, right: 30, bottom: 100, left: 100},
		width = 850 - margin.left - margin.right,
		height = 850 - margin.top - margin.bottom;
	const canvasRef = useRef(null);
	var myColor = d3.scaleOrdinal(d3.schemeCategory10);

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = width;
		canvas.height = height;
		let data, nodes, links, context, simulation;
		if(matrixName!==undefined){
			data = distanceMatrix[matrixName];
			nodes = data.nodes.map(node => {
				return {...node};
			}); 
			links = data.links.filter(link => link.value<20).map(link => {
				return {...link};
			});
			context = canvas.getContext("2d");
			simulation = d3.forceSimulation(nodes).
				force("link", d3.forceLink(links).
					id(function(d){
						return d.id;
					}).
					distance(function(d) {
						return d.value})).
				force("charge", d3.forceManyBody()).
				force("center", d3.forceCenter(width / 2, height / 2));

			simulation.
				on("tick", ticked);
			d3.select(canvas).
				call(d3.drag().
					container(canvas).
					subject(dragsubject).
					on("start", dragstarted).
					on("drag", dragged).
					on("end", dragended));
		}
		else{
			context = canvas.getContext("2d");
			context.clearRect(0, 0, width, height);
		}
			
		function ticked() {
			context.clearRect(0, 0, width, height);
			context.beginPath();
			links.forEach(drawLink);
			context.strokeStyle = "#aaa";
			context.stroke();
			nodes.forEach(drawNode);
		}	

		function dragsubject(event) {
			return simulation.find(event.x, event.y);
		}

		function dragstarted(event) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		function dragged(event) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		function dragended(event) {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}

		function drawLink(d) {
			context.moveTo(d.source.x, d.source.y);
			context.lineTo(d.target.x, d.target.y);
		}

		function drawNode(d) {
			context.beginPath();
			context.moveTo(d.x + 3, d.y);
			context.arc(d.x, d.y, 4, 0, 2 * Math.PI);
			context.fillStyle = myColor(d[color]);
			context.strokeStyle = myColor(d[color]);
			context.fill();
			context.stroke();
		}
	},)
	return(
		<canvas ref={canvasRef}></canvas>
	)
}
export default observer(ForceField);