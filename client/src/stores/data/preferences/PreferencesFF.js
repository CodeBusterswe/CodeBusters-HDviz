import { makeAutoObservable } from "mobx";
class PreferencesFF{
	constructor(){
		this._distanceMatrix = undefined;
		this._color = undefined;
		this._distMax = Infinity;
		this._distMin = 0;
		makeAutoObservable(this);
	}

	get distanceMatrix(){
		return this._distanceMatrix;
	}

	get distMax(){
		return this._distMax;
	}

	get distMin(){
		return this._distMin;
	}

	get color(){
		return this._color;
	}
	
	set color(value){
		this._color = value;
	}

	set distMin(value){
		this._distMin = value;
	}

	set distMax(value){
		this._distMax = value;
	}

	set distanceMatrix(value){
		this._distanceMatrix = value;
	}

	toJSON(){
		return {
			distanceMatrix : this.distanceMatrix ? this.distanceMatrix : "undefined",
			color : this.color ? this.color : "undefined",
			distMax : this.distMax !== Infinity ? this.distMax : "Infinity",
			distMin : this.distMin
		};
	}

	fromJSON(obj){
		this.distanceMatrix = obj.distanceMatrix === "undefined" ? undefined : obj.distanceMatrix;
		this.color = obj.color === "undefined" ? undefined : obj.color;
		this.distMax = obj.distMax ==="Infinity" ? Infinity : obj.distMax;
		this.distMin = obj.distMin;
	}
}

export default PreferencesFF;