import { makeAutoObservable} from "mobx";
import * as d3 from "d3";
import {select} from "d3";

export class FfChartVM {

	myColor = d3.scaleOrdinal(d3.schemeCategory10);
	margin = {top: 30, right: 30, bottom: 100, left: 100};
	width = 950 - this.margin.left - this.margin.right;
	height = 850 - this.margin.top - this.margin.bottom;
	radius = 4;
	
	constructor(rootStore){
		this.preferencesStore = rootStore.preferencesStore;
		this.distanceMatricesStore = rootStore.distanceMatricesStore;
		makeAutoObservable(this, {preferencesStore:false}, {autoBind: true});
	}

	get distMin(){
    	return this.preferencesStore.preferencesFf.distMin;
	}
	get distMax(){
    	return this.preferencesStore.preferencesFf.distMax;
	}

	get color(){
		return this.preferencesStore.preferencesFf.color;
	}

	get distanceMatrix(){
    	return this.distanceMatricesStore.getDistanceMatrixByName(this.matrix);
	}

	get matrix(){
		return this.preferencesStore.preferencesFf.distanceMatrix;
	}
	
	get canvas(){
		return select(".forceField").select("canvas");
	}
	
	renderChart(){
		const parent = this;
		let nodes, links, context, simulation;
		this.canvas.
			attr("width", this.width).
			attr("height", this.height);
		if(this.distanceMatrix){
			nodes = this.distanceMatrix.nodes.map(node => {return {...node};}); 
			links = this.distanceMatrix.
				links.filter(link => link.value < this.distMax && link.value > this.distMin).
				map(link => {return {...link};
				});
			context = this.canvas.node().getContext("2d");

			simulation = d3.forceSimulation(nodes).
				force("link", d3.forceLink(links).
					id(function(d){return d.id;}).
					distance(function(d) {return d.value;})).
				force("charge", d3.forceManyBody()).
				force("center", d3.forceCenter(this.width / 2, this.height / 2));
			simulation.
				on("tick", ticked);
			this.canvas.call(
				d3.drag().
					container(this.canvas.node()).
					subject(dragsubject).
					on("start", dragstarted).
					on("drag", dragged).
					on("end", dragended)
			);
		}
		else{
			context = this.canvas.node().getContext("2d");
			context.clearRect(0, 0, this.width, this.height);
		}

		function ticked(){
			context.clearRect(0, 0, parent.width, parent.height);
			context.beginPath();
			links.forEach(drawLink);
			context.strokeStyle = "#aaa";
			context.stroke();
			nodes.forEach(drawNode);
		}

		function drawLink(d){
			context.moveTo(d.source.x, d.source.y);
			context.lineTo(d.target.x, d.target.y);
		}
		function drawNode(d){
			context.beginPath();
			d.x = Math.max(parent.radius, Math.min(parent.width - parent.radius, d.x));
			d.y = Math.max(parent.radius, Math.min(parent.height - parent.radius, d.y));
			context.moveTo(d.x + 3, d.y);
			context.arc(d.x, d.y, parent.radius, 0,2 * Math.PI);
			context.fillStyle = parent.myColor(d[parent.color]);
			context.strokeStyle = parent.myColor(d[parent.color]);
			context.fill();
			context.stroke();
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
	
	}
	
}