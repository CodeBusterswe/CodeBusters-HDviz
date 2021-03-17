import { makeAutoObservable, makeObservable, observable, computed, action } from "mobx"
import {VisualizationType} from "../utils"
//import Dimension from "./Dimension";
class Preferences{
	constructor(){
		this._chart = {
			[VisualizationType.ScatterPlotMatrix]: false,
			[VisualizationType.ForceField]: false,
			[VisualizationType.HeatMap]: false,
			[VisualizationType.AdjacencyMatrix]: false,
			[VisualizationType.PLMA]: false,
		}
		makeAutoObservable(this)
	}
	get chart(){
		return Object.keys(this._chart).filter(key => this._chart[key])[0]
	}

	set chart(chart_name){
		if(this._chart[chart_name])
			this._chart[chart_name] = false
		else{
			this.resetGraph();
			this._chart[chart_name] = true
		}
	}
	resetGraph(){
		this._chart[VisualizationType.ScatterPlotMatrix] = false;
		this._chart[VisualizationType.ForceField] = false;
		this._chart[VisualizationType.HeatMap] = false;
		this._chart[VisualizationType.AdjacencyMatrix] = false;
		this._chart[VisualizationType.PLMA] = false;
	}
}
class Model {
	constructor(){
		this.preferences = new Preferences();
		this.dimensions = [];
		this.originalData = [];
		this.selectedData = [];
		this.distanceMatrices = [];
		makeObservable(this, {
			dimensions : observable,
			preferences: observable,
		})
		
	}

	addDistanceMatrix(matrix) {
		this.distanceMatrices.push(matrix);
	}

	getDistanceMatrices() {
		return this.distanceMatrices;
	}

	getChartToShow(){
		return this.preferences.chart;
	}

	isDataLoaded(){
		return this.dimensions.length === 0;
	}
	setChartToShow(chartName){
		this.preferences.chart = chartName
	}

	getDimensions() {
		return this.dimensions;
	}

	getDimensionsChecked(){
		return this.dimensions.filter(dim => dim.getChecked());
	}

	getCategoricCheckedDimensions(){
		return this.dimensions.filter(dim => dim.getChecked() && !dim.getNumeric());
	}

	getOriginalData() {
		return this.originalData;
	}

	getSelectedData() {
		return this.selectedData;
	}
    
	getNumericDimensions() {
		return this.dimensions.filter(dim => dim.getChecked() && dim.getNumeric());
	}
    
	getSelectedDimensions() {
		return this.dimensions.filter(dim => dim.getChecked() && !dim.getIsReduced());
	}
    
	loadData(data) {
		this.originalData = [...data];
		console.log(this.originalData)
	}
	loadDimensions(dimensions){
		this.dimensions = dimensions;
	}
	updateSelectedData(selectedData){
		this.selectedData=selectedData;
	}

	addDimensionsToDataset(dimensions) {
		this.dimensions = this.dimensions.concat(dimensions);
	}

	//se non serve calncellare
	removeDimensionToDataset(dimension) {
		const pos = this.dimensions.indexOf(dimension);
		if(pos > -1) {
			this.dimensions.splice(pos,1);
			this.selectedData.splice(pos,1);
		}
	}

	reset() {
		this.originalData = [];
		this.dimensions = [];
		this.selectedData = [];
	}   
}

export default Model