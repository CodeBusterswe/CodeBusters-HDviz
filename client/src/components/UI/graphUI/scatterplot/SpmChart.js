import React, {useEffect} from "react";
import * as d3 from "d3";
import { useStore } from "../../../../ContextProvider";
import { select } from "d3";
import { observer } from "mobx-react-lite";

const ScatterPlotMatrix = () => {
	const viewModel = useStore();
	const data = viewModel.getSelectedData();
	const color = viewModel.getSpmColor();
	let svg = select(".scatterPlotMatrix")
	let xAxis, yAxis, domainByTrait={}, yScales={}, xScales={}, palette;
	const size = 400, padding = 20, legendRectSize = 18, legendSpacing = 4;
	const traits = viewModel.getSpmAxis();
	const numberOfTraits = traits.length;

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
    
	function plot(p) {
		var cell = d3.select(this);
		cell.append("rect").
			attr("class", "frame").
			attr("x", padding / 2).
			attr("y", padding / 2).
			attr("width", size - padding).
			attr("height", size - padding);

		cell.selectAll("circle").
			data(data).
			enter().append("circle").
			transition().duration(500).
			attr("cx", function(d) { return xScales[p.x](d[p.x]); }).
			attr("cy", function(d) { return yScales[p.y](d[p.y]); }).
			attr("r", 4).
			style("fill", function(d) { return palette(d[color]); });
	}
	useEffect(() => {
		//svg = select(".scatterPlotMatrix")
		//svg.attr("width", size * numberOfTraits + padding + legendRectSize + 125)
		//svg.attr("height", size * numberOfTraits + padding)
		//svg.attr("viewBox", "0 0 " + (size * numberOfTraits + padding + legendRectSize + 125) + " " + (size * numberOfTraits + padding))
		update();
	})
	function updateScales(){
		//update color
		let colorDomain = d3.extent(data, function(d) {return +d[color]; });
		console.log(colorDomain)
		if(colorDomain[0])
			palette = d3.scaleLinear().domain(colorDomain).range(["yellow", "blue"]);//
		else{
			console.log("else")
			palette = d3.scaleOrdinal(d3.schemeCategory10);
		}
		//
		traits.forEach(trait => {
			domainByTrait[trait] = d3.extent(data, function(d) {return +d[trait]; });
			let xScale, yScale;
			if(domainByTrait[trait][0] || domainByTrait[trait][0]===0){//controllo se il minore è un numero
				xScale=d3.scaleLinear().domain(domainByTrait[trait])
				yScale=d3.scaleLinear().domain(domainByTrait[trait])
			}else{
				let domain = data.map(l => l[trait]);
				xScale=d3.scalePoint().domain([...new Set(domain)])
				yScale=d3.scalePoint().domain([...new Set(domain)])
			}
			xScale.range([padding / 2, size - padding / 2]);
			yScale.range([size - padding / 2, padding / 2]);
			xScales[trait]=xScale;
			yScales[trait]=yScale;
		}); //calcola i massimi e i minimi
        
	}
	function updateAxis(){
		svg.selectAll(".x.axis").remove();
		svg.selectAll(".x.axis").
			data(traits). 
			enter(). 
			append("g"). 
			attr("class", "x axis").
			attr("transform", function(d, i) { 
				return "translate(" + (i * size + 20)+",0)"; 
			}).
			each(function(d) {
				xAxis = d3.axisBottom(xScales[d]).
					ticks(6). //quante tacchette sull'asse
					tickSize(size * numberOfTraits);
				d3.select(this).call(xAxis);
			});

		svg.selectAll(".y.axis").remove();
		svg.selectAll(".y.axis").
			data(traits).
			enter().
			append("g").
			attr("class", "y axis").
			attr("transform", function(d, i) {
				return "translate(20," + i * size+")"; 
			}).
			each(function(d) { 
				yAxis = d3.axisLeft(yScales[d]).
					ticks(6).
					tickSize(-size * numberOfTraits);
				d3.select(this).call(yAxis); 
			});
	}
	function updatePoints(){
		svg.selectAll(".cell").remove();
		let cell = svg.selectAll(".cell").
			data(cross(traits, traits)).
		//quindi abbiamo tutte le possibili coppie tra le varie dimensioni selezionate
			enter().append("g"). //aggiungo un oggetto per ogni coppia
			attr("class", "cell").
			attr("transform", function(d) {
				return "translate(" + (d.i * size +20) + "," + d.j * size + ")"; }).
		//creo il grafico in due dimensioni per ogni oggetto
			each(plot);
            
		//seleziono le celle con le due dimensioni uguali
		//a queste celle aggiungo una label con il testo
		cell.filter(function(d) { return d.i === d.j; }). 
			append("text").
			attr("x", padding).
			attr("y", padding).
			attr("dy", ".71em").
			text(function(d) { return d.x; });

	}
	function updateLegend(){
		svg.selectAll(".legend").remove();
		var legend = svg.selectAll(".legend").
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
			style("stroke", palette);
     
		legend.append("text").
			attr("x", legendRectSize + legendSpacing).
			attr("y", legendRectSize - legendSpacing).
			text(function (d) {
				return d;
			});

	}
	function update(){
		updateScales();
		updateAxis();
		updatePoints();
		updateLegend();
	}
	return (
		<svg className="scatterPlotMatrix"></svg>
	)
}
export default observer(ScatterPlotMatrix)