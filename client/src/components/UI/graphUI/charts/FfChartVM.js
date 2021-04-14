import { makeAutoObservable} from "mobx";
import * as d3 from "d3";
import {select} from "d3";

export class FfChartVM {

	myColor = d3.scaleOrdinal(d3.schemeCategory10);
	margin = {top: 30, right: 30, bottom: 100, left: 100};
	width = 1500 - this.margin.left - this.margin.right;
	height = 850 - this.margin.top - this.margin.bottom;
	radius = 4;
	//canvasRef = useRef(null);
	
	constructor(rootStore){
		this.preferencesStore = rootStore.preferencesStore;
		this.distanceMatricesStore = rootStore.distanceMatricesStore;
		//this.distanceMatrix = this.distanceMatricesStore.getDistanceMatrixByName(this.matrix);
		this.color = this.preferencesStore.preferencesFf.color;
		this.distMax = this.preferencesStore.preferencesFf.distMax;
		this.distMin = this.preferencesStore.preferencesFf.distMin;

		makeAutoObservable(this, {preferencesStore:false}, {autoBind: true});
	}

	get getDistanceMatrixWithName(){
		console.log("this.matrix:",this.matrix);
		return this.distanceMatricesStore.getDistanceMatrixByName(this.matrix);
	}

	get matrix(){
		return this.preferencesStore.preferencesFf.distanceMatrix;
	}
	
	get canvas(){
		console.log("getDistanceMatrixWithName:",this.matrix);
		return select(".forceField").select("canvas");
	}
	get getRadius(){
		return this.radius;
	}
	renderChart(){
		const canvas = this.canvas;
		console.log("canvas:",this.radius);
		canvas.width = this.width;
		canvas.height = this.height;
		let nodes, links, context, simulation;
		if(this.getDistanceMatrixWithName){
			nodes = this.getDistanceMatrixWithName.nodes.map(node => {return {...node};}); 
			links = this.getDistanceMatrixWithName.
				links.filter(link => link.value < this.distMax && link.value > this.distMin).
				map(link => {return {...link};
				});
			context = canvas.node().getContext("2d");
			console.log("context:",context);
			simulation = d3.forceSimulation(nodes).
				force("link", d3.forceLink(links).
					id(function(d){
						return d.id;
					}).
					distance(function(d) {
						return d.value;})).
				force("charge", d3.forceManyBody()).
				force("center", d3.forceCenter(this.width / 2, this.height / 2));
			console.log("simulation:",simulation);
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
			context = canvas.node().getContext("2d");
			context.clearRect(0, 0, this.width, this.height);
		}
		
		function ticked() {
			//console.log("this:",nodes);
			context.clearRect(0, 0, this.width, this.height);
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
		function drawNode(d){
			console.log("drawNode:",this.radius);
			context.beginPath();
			d.x = Math.max(4, Math.min(this.width - this.radius, d.x));
			d.y =Math.max(this.radius, Math.min(this.height - this.radius, d.y));
			context.moveTo(d.x + 3, d.y);
			context.arc(d.x, d.y, this.radius, 0, 2 * Math.PI);
			context.fillStyle = this.myColor(d[this.color]);
			context.strokeStyle = this.myColor(d[this.color]);
			context.fill();
			context.stroke();
		}
	
	}
	
}