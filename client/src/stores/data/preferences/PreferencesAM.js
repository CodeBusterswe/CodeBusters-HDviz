import { makeAutoObservable } from "mobx";

class PreferencesAM{
	constructor(){
		this._distanceMatrix = undefined;
		this._orderBy = undefined;
		this._label = undefined;
		this._distMax = Infinity;
		this._distMin = 0;
		makeAutoObservable(this);
	}

	get distanceMatrix(){
		return this._distanceMatrix;
	}

	get orderBy(){
		return this._orderBy;
	}
	
	get label(){
		return this._label;
	}
	
	get distMax(){
		return this._distMax;
	}
	
	get distMin(){
		return this._distMin;
	}

	set distanceMatrix(value){
		this._distanceMatrix = value;
	}

	set orderBy(value){
		this._orderBy = value;
	}
	
	set label(value){
		this._label = value;
	}
	
	set distMax(value){
		this._distMax = value;
	}
	
	set distMin(value){
		this._distMin = value;
	}

	toJSON(){
		return {
			distanceMatrix : this.distanceMatrix ? this.distanceMatrix : "undefined",
			orderBy : this.orderBy ? this.orderBy : "undefined",
			label: this.label ? this.label : "undefined",
			distMax : this.distMax !== Infinity ? this.distMax : "Infinity",
			distMin : this.distMin
		};
	}

	fromJSON(obj){
		this.distanceMatrix = obj.distanceMatrix === "undefined" ? undefined : obj.distanceMatrix;
		this.orderBy = obj.orderBy === "undefined" ? undefined : obj.orderBy;
		this.label = obj.label === "undefined" ? undefined : obj.label;
		this.distMax = obj.distMax ==="Infinity" ? Infinity : obj.distMax;
		this.distMin = obj.distMin;
	}
}

export default PreferencesAM;