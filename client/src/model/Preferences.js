import { makeAutoObservable} from "mobx";
import {VisualizationType} from "../utils";
class Preferences{
	#chart;
	#SPMPreferences;
	#SPMColor;
	#AMpreferences;
	#HMpreferences;
	#FFpreferences;
	#PLMApreferences;
	constructor(){
		this.#chart = {
			[VisualizationType.ScatterPlotMatrix]: false,
			[VisualizationType.ForceField]: false,
			[VisualizationType.HeatMap]: false,
			[VisualizationType.AdjacencyMatrix]: false,
			[VisualizationType.PLMA]: false,
		};
		this.#SPMPreferences = {
			axis1: undefined,
			axis2: undefined,
			axis3: undefined,
			axis4: undefined,
			axis5: undefined,
		};
		this.#SPMColor = undefined;
		this.#AMpreferences = {
			distanceMatrix: undefined,
			orderBy: undefined,
			label: undefined
		};
		this.#HMpreferences = {
			xAxis: undefined,
			yAxis: undefined,
			heat: undefined
		};
		this.#FFpreferences = {
			distanceMatrix: undefined,
			color: undefined,
			distMax: Infinity,
			distMin: 0,
		};
		this.#PLMApreferences = {
			dimensions: [],
			color: undefined,
		};

		makeAutoObservable(this);
	}

	set chart(chart_name){
		if(this.#chart[chart_name])
			this.#chart[chart_name] = false;
		else{
			this.resetCharts();
			this.#chart[chart_name] = true;
		}
	}
	get plmaDimensions(){
		return this.#PLMApreferences.dimensions;
	}
	get plmaColor(){
		return this.#PLMApreferences.plmaColor;
	}
	set plmaDimensions(dimensions){
		this.#PLMApreferences.dimensions = dimensions ;
	}
	set plmaColor(color){
		this.#PLMApreferences.color = color;
	}
	get amLabel(){
		return this.#AMpreferences.label;
	}

	get amDistanceMatrix(){
		return this.#AMpreferences.distanceMatrix;
	}	

	get amOrderBy(){
		return this.#AMpreferences.orderBy;
	}

	set amLabel(label){
		this.#AMpreferences.label = label;
	}
	
	set amDistanceMatrix(matrix){
		this.#AMpreferences.distanceMatrix = matrix;
	}

	set amOrderBy(group){
		this.#AMpreferences.orderBy = group;
	}

	set hmXaxis(dimension){
		this.#HMpreferences.xAxis = dimension;
	}

	set hmYaxis(dimension){
		this.#HMpreferences.yAxis = dimension;
	}

	set hmFill(heat){
		this.#HMpreferences.heat = heat;
	}

	get hmXaxis(){
		return this.#HMpreferences.xAxis;
	}

	get hmYaxis(){
		return this.#HMpreferences.yAxis;
	}

	get hmFill(){
		return this.#HMpreferences.heat;
	}

	set ffDistanceMatrix(matrix){
		this.#FFpreferences.distanceMatrix = matrix;
	}

	set ffColor(group){
		this.#FFpreferences.color = group;
	}

	set ffDistMin(dist){
		this.#FFpreferences.distMin = dist;
	}

	set ffDistMax(dist){
		this.#FFpreferences.distMax = dist;
	}

	get ffDistanceMatrix(){
		return this.#FFpreferences.distanceMatrix;
	}

	get ffColor(){
		return this.#FFpreferences.color;
	}
	get ffDistMin(){
		return this.#FFpreferences.distMin;
	}

	get ffDistMax(){
		return this.#FFpreferences.distMax;
	}

	set SpmAxis1(dimensionsValue){
		this.#SPMPreferences.axis1 = dimensionsValue;
	}
	set SpmAxis2(dimensionsValue){
		this.#SPMPreferences.axis2 = dimensionsValue;
	}
	set SpmAxis3(dimensionsValue){
		this.#SPMPreferences.axis3 = dimensionsValue;
	}
	set SpmAxis4(dimensionsValue){
		this.#SPMPreferences.axis4 = dimensionsValue;
	}
	set SpmAxis5(dimensionsValue){
		this.#SPMPreferences.axis5 = dimensionsValue;
	}
	set SpmColor(dimensionsValue){
		this.#SPMColor = dimensionsValue;
	}

	get amPreferences(){
		return this.#AMpreferences;
	}

	get ffPreferences(){
		return this.#FFpreferences;
	}

	get plmaPreferences(){
		return this.#PLMApreferences;
	}

	get hmPreferences(){
		return this.#HMpreferences;
	}

	setSPMAxis(identifier, value){
		this.#SPMPreferences[identifier] = value;
	}

	get SpmAxis1(){
		return this.#SPMPreferences.axis1;
	}
	get SpmAxis2(){
		return this.#SPMPreferences.axis2;
	}
	get SpmAxis3(){
		return this.#SPMPreferences.axis3;
	}
	get SpmAxis4(){
		return this.#SPMPreferences.axis4;
	}
	get SpmAxis5(){
		return this.#SPMPreferences.axis5;
	}
	get SpmColor(){
		return this.#SPMColor;
	}

	get chart(){
		return Object.keys(this.#chart).filter(key => this.#chart[key])[0];
	}

	resetCharts(){
		this.#chart[VisualizationType.ScatterPlotMatrix] = false;
		this.#chart[VisualizationType.ForceField] = false;
		this.#chart[VisualizationType.HeatMap] = false;
		this.#chart[VisualizationType.AdjacencyMatrix] = false;
		this.#chart[VisualizationType.PLMA] = false;
	}

	resetSpmPreferences(){
		this.SpmAxis1 = undefined;
		this.SpmAxis2 = undefined;
		this.SpmAxis3 = undefined;
		this.SpmAxis4 = undefined;
		this.SpmAxis5 = undefined;
		this.SpmColor = undefined;
	}

	resetFfPreferences(){
		this.#FFpreferences.distanceMatrix = undefined;
		this.#FFpreferences.forceType = undefined;
		this.#FFpreferences.color = undefined;
	}

	resetAmPreferences(){
		this.#AMpreferences.distanceMatrix = undefined;
		this.#AMpreferences.orderBy = undefined;
	}

	resetHmPreferences(){
		this.#HMpreferences.xAxis = undefined;
		this.#HMpreferences.yAxis = undefined;
		this.#HMpreferences.heat = undefined;
	}
	resetPlmaPreferences(){
		this.#PLMApreferences.dimensions.clear();
		this.#PLMApreferences.color = undefined;
	}

	reset(){
		this.resetCharts();
		this.resetSpmPreferences();
		this.resetHmPreferences();
		this.resetFfPreferences();
		this.resetAmPreferences();
		this.resetPlmaPreferences();
	}
} 

export default Preferences;