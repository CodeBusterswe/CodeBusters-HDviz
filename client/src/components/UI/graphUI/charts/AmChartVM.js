import { makeAutoObservable} from "mobx";
import * as d3 from "d3";
import { select } from "d3";

export class AmChartVM {

    margin = {top: 30, right: 30, bottom: 100, left: 100};
    width = 850 - this.margin.left - this.margin.right;
    height = 850 - this.margin.top - this.margin.bottom;
	
    constructor(rootStore){
    	this.preferencesStore = rootStore.preferencesStore;
    	this.distanceMatricesStore = rootStore.distanceMatricesStore;

    	this.distanceMatrix = this.distanceMatricesStore.getDistanceMatricesByName(this.matrix);
    	this.orderBy = this.preferencesStore.preferencesAm.orderBy;
    	this.dimLabels = this.preferencesStore.preferencesAm.label;
    	this.distMax = this.preferencesStore.preferencesAm.distMax;
    	this.distMin = this.preferencesStore.preferencesAm.distMin;

    	makeAutoObservable(this, {preferencesStore:false}, {autoBind: true});
    }

    get matrix(){
    	return this.preferencesStore.preferencesAm.distanceMatrix;
    }

    renderChart(){
    	let nodes = [], links= [];
    	if(this.distanceMatrix){
    		nodes = this.distanceMatrix.nodes; 
    		links = this.distanceMatrix.links.map(link => {
    			if(!(link.value < this.distMax && link.value > this.distMin)){
    				let temp = {...link};
    				temp.value = -1;
    				return temp;
    			}
    			return link;
    		});
    	}
    	const scale = d3.scaleBand().
    			domain(nodes.map(d => d.id)).
    			range([ 0, this.width]),
    		colors = d3.scaleOrdinal(d3.schemeCategory10);

    	let opacity = d3.scaleLinear().	//dovrei avere una scala per gruppo
    		domain(d3.extent(links.filter(link => link.value > 0).map(obj => obj.value))).
    		range([1, 0.25]).
    		clamp(true);
    	//remove previous chart
    	select(".adjacencyMatrix").selectAll("svg").remove();
    	select(".adjacencyMatrix").selectAll("canvas").remove();
			
    	const svg = select(".adjacencyMatrix").
    		append("svg").
    		attr("id","am-svg").
    		attr("class","plot").
    		attr("width", this.width + this.margin.left + this.margin.right).
    		attr("height", this.height + this.margin.top + this.margin.bottom);
			
    	nodes.sort(function(x, y){
    		return d3.ascending(x[this.orderBy], y[this.orderBy]);
    	});
			
    	let linkHash = {};
    	links.forEach(edge =>{
    		let id = edge.source + "-" + edge.target;
    		linkHash[id] = edge;
    	});

    	var matrix = [];
    	for (let i = 0; i < nodes.length; i++) {
    		for (let j = 0; j < nodes.length; j++) {
    			let grid = {id: nodes[i].id+"-"+nodes[j].id, x:i, y: j, source: nodes[i], target: nodes[j], value: 0};
    			if(linkHash[grid.id]){ //esiste
    				grid.value = linkHash[grid.id].value; //value=2
    			}else{
    				var split = grid.id.split("-");
    				let correct = split[1]+ "-" + split[0];
    				console.log(correct);
    				if(split[1]!==split[0]){
    					grid.value = linkHash[correct].value;
    				}
    			}
    			matrix.push(grid);
    		}
    	}
    	let canvas = select(".adjacencyMatrix").
    		append("canvas").
    		attr("class", "plot").
    		attr("id", "am-canvas").
    		attr("width", this.width + this.margin.left + this.margin.right).
    		attr("height", this.height + this.margin.top + this.margin.bottom);
    	if(canvas.node()){
    		let ctx = canvas.node().getContext("2d");
    		ctx.translate(50, 50);

    		matrix.forEach(d => {
    			ctx.beginPath();
    			ctx.rect(d.x*scale.bandwidth(), d.y*scale.bandwidth(), scale.bandwidth(),scale.bandwidth());
    			ctx.closePath();
    			function hex2rgba(hexa, op){
    				let r = parseInt(hexa.slice(1,3), 16),
    					g = parseInt(hexa.slice(3,5), 16),
    					b = parseInt(hexa.slice(5,7), 16);
    				return "rgba("+r+", "+g+", "+b+", "+op+")";
    			}
    			let c, op = opacity(d.value);
    			if (d.value >= 0 && d.source[this.orderBy] === d.target[this.orderBy]) {
    				c = colors(d.source[this.orderBy]);	//appartengono allo stesso gruppo e hanno valore positivo
    			} else if (d.value > 0) {
    				c = "#555555";	//sono di gruppi diversi ma esistono
    			} else {
    				c = "#ffffff"; //hanno value negativo(scartati dall'utente o Nan)
    				op = 0;
    			}
    			ctx.fillStyle = hex2rgba(c, op);
    			ctx.fill();
    			if(nodes.length<50){
    				ctx.fillStyle = hex2rgba("#000000", 1);
    				ctx.stroke();
    			}
    		});
    	}	
    	svg.
    		append("g").
    		attr("transform","translate(50,45)"). 
    		selectAll("text").
    		data(nodes).
    		enter().
    		append("text").attr("transform","rotate(-90)").
    		attr("y", (d,i) => i * scale.bandwidth() + scale.bandwidth()/2).
    		text(d => d[this.dimLabels]).
    		style("text-anchor","start").
    		style("font-size","10px");        
		
    	svg.
    		append("g").attr("transform","translate(45,50)").
    		selectAll("text").
    		data(nodes).
    		enter().
    		append("text").
    		attr("y",(d,i) => i * scale.bandwidth() + scale.bandwidth()/2).
    		text(d => d[this.dimLabels]).
    		style("text-anchor","end").
    		style("font-size","10px");
    }
    
}