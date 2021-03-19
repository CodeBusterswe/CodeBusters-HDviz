import React, {useEffect} from "react";
import * as d3 from "d3";
import { useStore } from "../../../../ContextProvider";
import { select } from "d3";
import { observer } from "mobx-react-lite";

const ScatterPlotMatrix = () => {
	const viewModel = useStore();
	const data = viewModel.getSelectedData();
	const [axes, color] = viewModel.getSpmPreferences();
	const traits = axes.filter(axis => axis)
	let domainByTrait={}, yScales={}, xScales={}, palette, ctx;
	const size = 200, padding = 20, legendRectSize = 18, legendSpacing = 4, numberOfTraits = traits.length, pointRadius = 2;
	let svg = select("#spm-svg").attr("width", size * numberOfTraits + 4*padding + 200).
		attr("height", size * numberOfTraits + 4*padding).
		select("g").attr("transform", "translate("+4*padding+","+padding/2+")");
	let canvas = select("#spm-canvas").attr("width", size*numberOfTraits+4*padding).
		attr("height", size*numberOfTraits+4*padding).
		style("transform", "translate("+4*padding+","+padding/2+")");

	//prodotto cartesiano delle dimensioni
	function cross(a, b) {
		var c = [], n = a.length, m = b.length, i, j;
		for (i = -1; ++i < n;) 
			for (j = -1; ++j < m;) 
				c.push({x: a[i], 
					i: i, 
					y: b[j], 
					j: j});
		return c;
	}
    
	useEffect(()=> {
		updateScales();
		updateAxis();
		updateColor();
		if(canvas.node()){	//non é la prima esecuzione
			ctx = canvas.node().getContext("2d");
			updatePointsCanvas();
		}
		if(color)
			updateLegend();
	}, [axes, color])
	
	function updatePointsCanvas(){
		svg.selectAll(".cell").remove();
		let cell = svg.selectAll(".cell").
			data(cross(traits, traits)).
			enter().append("g").
			attr("class", "cell").
			attr("transform", function(d) {
				return "translate(" + d.i*size + "," + d.j*size + ")";
			}).
			each(draw);
		//aggiunge label alle cell centrali
		cell.filter(function(d) { return d.i === d.j; }). 
			append("text").
			attr("x", 25).
			attr("y", size/2).
			style("fill", "#992600").
			//attr("dy", size/2).
			text(function(d) { return d.x; });
	}
	function draw(p) {
		let cell = select(this);
		cell.append("rect").
			attr("class", "frame").
			attr("x", padding / 2).
			attr("y", padding / 2).
			attr("width", size - padding).
			attr("height", size - padding);

		ctx.resetTransform();
		ctx.transform(1, 0, 0, 1, p.i*size+4*padding, p.j*size+padding/2);

		//disegna i punti
		if(p.i !== p.j){
			data.forEach(d => {
				ctx.beginPath();
				ctx.arc(xScales[p.x](d[p.x]), yScales[p.y](d[p.y]), pointRadius, 0, 2*Math.PI);
				ctx.closePath();
				ctx.fillStyle = palette(d[color]);
				ctx.fill();
			});
		}
		
	}
	function updateColor(){
		let colorDomain = d3.extent(data, function(d) {return +d[color]; });
		if(colorDomain[0])
			palette = d3.scaleLinear().domain(colorDomain).range(["yellow", "blue"]);//
		else{
			palette = d3.scaleOrdinal(d3.schemeCategory10);
		}
		console.log(palette);
	}
	function updateScales(){
		traits.forEach(t => {
			domainByTrait[t] = d3.extent(data, function(d) { return +d[t]; });
			//
			let xScale, yScale;
			if(domainByTrait[t][0] || domainByTrait[t][0]===0){//controllo se il minore è un numero
				xScale=d3.scaleLinear().domain(domainByTrait[t])
				yScale=d3.scaleLinear().domain(domainByTrait[t])
			}else{
				let domain = data.map(l => l[t]);
				xScale=d3.scalePoint().domain([...new Set(domain)])
				yScale=d3.scalePoint().domain([...new Set(domain)])
			}
			xScale.range([padding / 2, size - padding / 2]);
			yScale.range([size - padding / 2, padding / 2]);
			xScales[t]=xScale;
			yScales[t]=yScale;
		  });
	}
	function updateAxis(){
		svg.selectAll(".x.axis").remove()
		svg.selectAll(".x.axis").
			data(traits).
			enter().append("g").
			attr("class", "x axis").
			attr("transform", function(d, i) { return "translate("+size*i+",0)"; }).
			each(function(d){
				let x_axis = d3.axisBottom(xScales[d]).
					ticks(6).
					tickSize(size * numberOfTraits);
				//console.log(x_axis);
				select(this).call(x_axis); 
			});

		svg.selectAll(".y.axis").remove()
		svg.selectAll(".y.axis").
			data(traits).
			enter().append("g").
			attr("class", "y axis").
			attr("transform", function(d, i) { return "translate(0,"+size*i+")"; }).
			each(function(d) {
				let y_axis = d3.axisLeft(yScales[d]).
					ticks(6).
					tickSize(-size * numberOfTraits);
				select(this).call(y_axis); 
			});
	}
	
	function updateLegend(){
		svg.selectAll(".legend").remove();
		let legend = svg.selectAll(".legend").
			data(palette.domain()).
			enter().
			append("g").
			attr("class", "legend").
			attr("transform", function (d, i) {
				var height = legendRectSize + legendSpacing;
				var offset = padding;
				var horz = size * numberOfTraits + padding;
				var vert = i * height + offset;
				return "translate(" + horz + "," + vert + ")";
			});
		legend.append("rect").
			attr("width", legendRectSize).
			attr("height", legendRectSize).
			style("fill", palette).
			style("stroke", "black");
     
		legend.append("text").
			attr("x", legendRectSize + legendSpacing).
			attr("y", legendRectSize - legendSpacing).
			text(function (d) {
				return d;
			});

	}
	return (
		<>
			<div className="chartDiv">
				<svg id="spm-svg" className="plot">
					<g></g>{/*serve per traslare il grafico a dx per vedere la legenda a sx*/}
				</svg>
				<canvas id="spm-canvas" class="plot"></canvas>
			</div>
		</>
	)
}
export default observer(ScatterPlotMatrix)