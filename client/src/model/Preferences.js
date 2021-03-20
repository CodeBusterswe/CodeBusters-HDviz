import { makeAutoObservable} from "mobx"
import {VisualizationType} from "../utils"
class Preferences{
	constructor(){
		this._chart = {
			[VisualizationType.ScatterPlotMatrix]: false,
			[VisualizationType.ForceField]: false,
			[VisualizationType.HeatMap]: false,
			[VisualizationType.AdjacencyMatrix]: false,
			[VisualizationType.PLMA]: false,
		}
		this._SPMPreferences = {
			axis1: undefined,
			axis2: undefined,
			axis3: undefined,
			axis4: undefined,
			axis5: undefined,
		}
		this._SPMColor = undefined
		this._AMpreferences = {
			distanceMatrix: undefined,
			orderBy: undefined,
			label: undefined
		}
		this._HMpreferences = {
			xAxis: undefined,
			yAxis: undefined,
			heat: undefined
		}
		this._FFpreferences = {
			distanceMatrix: undefined,
			color: undefined,
			forceType: undefined
		}
		this._PLMApreferences = {}

		makeAutoObservable(this);
	}

	set chart(chart_name){
		if(this._chart[chart_name])
			this._chart[chart_name] = false
		else{
			this.resetCharts();
			this._chart[chart_name] = true
		}
	}
	get amLabel(){
		return this._AMpreferences.label
	}

	get amDistanceMatrix(){
		return this._AMpreferences.distanceMatrix;
	}	

	get amOrderBy(){
		return this._AMpreferences.orderBy;
	}

	set amLabel(label){
		this._AMpreferences.label = label;
	}
	
	set amDistanceMatrix(matrix){
		this._AMpreferences.distanceMatrix = matrix;
	}

	set amOrderBy(group){
		this._AMpreferences.orderBy = group;
	}

	set hmXaxis(dimension){
		this._HMpreferences.xAxis = dimension;
	}

	set hmYaxis(dimension){
		this._HMpreferences.yAxis = dimension;
	}

	set hmFill(heat){
		this._HMpreferences.heat = heat;
	}

	get hmXaxis(){
		return this._HMpreferences.xAxis;
	}

	get hmYaxis(){
		return this._HMpreferences.yAxis;
	}

	get hmFill(){
		return this._HMpreferences.heat;
	}

	set ffDistanceMatrix(matrix){
		this._FFpreferences.distanceMatrix = matrix;
	}

	set ffColor(group){
		this._FFpreferences.color = group;
	}

	set ffForceType(force){
		this._FFpreferences.forceType = force;
	}

	get ffDistanceMatrix(){
		return this._FFpreferences.distanceMatrix;
	}

	get ffColor(){
		return this._FFpreferences.color;
	}

	get ffForceType(){
		return this._FFpreferences.forceType;
	}

	set SpmAxis1(dimensionsValue){
		this._SPMPreferences.axis1 = dimensionsValue
	}
	set SpmAxis2(dimensionsValue){
		this._SPMPreferences.axis2 = dimensionsValue
	}
	set SpmAxis3(dimensionsValue){
		this._SPMPreferences.axis3 = dimensionsValue
	}
	set SpmAxis4(dimensionsValue){
		this._SPMPreferences.axis4 = dimensionsValue
	}
	set SpmAxis5(dimensionsValue){
		this._SPMPreferences.axis5 = dimensionsValue
	}
	set SpmColor(dimensionsValue){
		this._SPMColor = dimensionsValue
	}

	get amPreferences(){
		return this._AMpreferences;
	}

	get ffPreferences(){
		return this._FFpreferences;
	}

	get plmaPreferences(){
		return this._PLMApreferences;
	}

	get hmPreferences(){
		return this._HMpreferences;
	}

	get SpmAxes(){
		return [this.SpmAxis1, this.SpmAxis2, this.SpmAxis3, this.SpmAxis4, this.SpmAxis5]
	}

	setSPMAxis(identifier, value){
		this._SPMPreferences[identifier] = value;
	}

	get SpmAxis1(){
		return this._SPMPreferences.axis1
	}
	get SpmAxis2(){
		return this._SPMPreferences.axis2
	}
	get SpmAxis3(){
		return this._SPMPreferences.axis3
	}
	get SpmAxis4(){
		return this._SPMPreferences.axis4
	}
	get SpmAxis5(){
		return this._SPMPreferences.axis5
	}
	get SpmColor(){
		return this._SPMColor
	}

	get chart(){
		return Object.keys(this._chart).filter(key => this._chart[key])[0]
	}

	resetCharts(){
		this._chart[VisualizationType.ScatterPlotMatrix] = false;
		this._chart[VisualizationType.ForceField] = false;
		this._chart[VisualizationType.HeatMap] = false;
		this._chart[VisualizationType.AdjacencyMatrix] = false;
		this._chart[VisualizationType.PLMA] = false;
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
		this._FFpreferences.distanceMatrix = undefined;
		this._FFpreferences.forceType = undefined;
		this._FFpreferences.color = undefined;
	}

	resetAmPreferences(){
		this._AMpreferences.distanceMatrix = undefined;
		this._AMpreferences.orderBy = undefined;
	}

	resetHmPreferences(){
		this._HMpreferences.xAxis = undefined;
		this._HMpreferences.yAxis = undefined;
		this._HMpreferences.heat = undefined;
	}

	reset(){
		this.resetCharts();
		this.resetSpmPreferences();
		this.resetHmPreferences();
		this.resetFfPreferences();
		this.resetAmPreferences();
	}
} 

export default Preferences;