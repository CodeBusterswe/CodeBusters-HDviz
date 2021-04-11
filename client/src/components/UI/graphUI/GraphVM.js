import { makeObservable, observable } from "mobx";
import {VisualizationType} from "../../../utils";
import { ScatterPlotMatrix, ForceField, AdjacencyMatrix, HeatMap, Plma } from "./charts";
import { ScatterPlotMatrixPreferences, ForceFieldPreferences, AdjacencyMatrixPreferences, HeatMapPreferences, PlmaPreferences } from "./preferences";

export class GraphVM {
    
	show = true;

	constructor(rootStore){
    	this.preferencesStore = rootStore.preferencesStore;

    	makeObservable(this,{
			show : observable
    	});
	}

	handlePref() {
		this.show = !this.show;
	}

	btnContent(){
		return this.show ? "Nascondi preferenze" : "Mostra preferenze";
	}

	get show(){
		return this.show;
	}

	renderPreferences(){
		switch(this.preferencesStore.getChartToShow()){
		case VisualizationType.ScatterPlotMatrix:
			return <ScatterPlotMatrixPreferences/>;
		case VisualizationType.AdjacencyMatrix:
			return <AdjacencyMatrixPreferences/>;
		case VisualizationType.ForceField:
			return <ForceFieldPreferences/>;
		case VisualizationType.HeatMap:
			return <HeatMapPreferences/>;
		case VisualizationType.PLMA:
			return <PlmaPreferences/>;
		default:
			return null;
		}
	}	

	renderCharts(){
		switch(this.preferencesStore.getChartToShow()){
		case VisualizationType.ScatterPlotMatrix:
			return <ScatterPlotMatrix/>;
		case VisualizationType.AdjacencyMatrix:
			return <AdjacencyMatrix/>;
		case VisualizationType.ForceField:
			return <ForceField/>;
		case VisualizationType.HeatMap:
			return <HeatMap/>;
		case VisualizationType.PLMA:
			return <Plma/>;
		default:
			return null;
		}
	}	
}
