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
			axis1: null,
			axis2: null,
			axis3: null,
			axis4: null,
			axis5: null,
		}
		this._SPMColor = null
		makeAutoObservable(this)
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

	get chart(){
		return Object.keys(this._chart).filter(key => this._chart[key])[0]
	}

	set chart(chart_name){
		this.resetSpmPreferences();
		if(this._chart[chart_name])
			this._chart[chart_name] = false
		else{
			this.resetCharts();
			this._chart[chart_name] = true
		}
	}
	resetCharts(){
		this._chart[VisualizationType.ScatterPlotMatrix] = false;
		this._chart[VisualizationType.ForceField] = false;
		this._chart[VisualizationType.HeatMap] = false;
		this._chart[VisualizationType.AdjacencyMatrix] = false;
		this._chart[VisualizationType.PLMA] = false;
	}
	resetSpmPreferences(){
		this.SpmAxis1 = null;
		this.SpmAxis2 = null;
		this.SpmAxis3 = null;
		this.SpmAxis4 = null;
		this.SpmAxis5 = null;
		this.SpmColor = null;
	}
	reset(){
		this.resetCharts();
		this.resetSpmPreferences();
	}
} export default Preferences