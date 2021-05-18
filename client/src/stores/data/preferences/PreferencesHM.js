import { makeAutoObservable } from "mobx";
class PreferencesHM{
	constructor(){
		this._xAxis = undefined;
		this._yAxis = undefined;
		this._heat = undefined;
		makeAutoObservable(this);
	}

	get xAxis(){
		return this._xAxis;
	}

	get yAxis(){
		return this._yAxis;
	}

	get heat(){
		return this._heat;
	}
	
	set xAxis(value){
		this._xAxis = value;
	}

	set yAxis(value){
		this._yAxis = value;
	}

	set heat(value){
		this._heat = value;
	}

	toJSON(){
		return {
			xAxis : this.xAxis ? this.xAxis : "undefined",
			yAxis : this.yAxis ? this.yAxis : "undefined",
			heat: this.heat ? this.heat : "undefined",
		};
	}

	fromJSON(obj){
		this.xAxis = obj.xAxis === "undefined" ? undefined : obj.xAxis;
		this.yAxis = obj.yAxis === "undefined" ? undefined : obj.yAxis;
		this.heat = obj.heat === "undefined" ? undefined : obj.heat;
	}
}

export default PreferencesHM;