import { makeAutoObservable } from "mobx";
class PreferencesFF{
	constructor(){
		this._distanceMatrix = "undefined";
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

	serializeJSON(){
		//return json
	}

	deserializeJSON(string){
		//deserialize
	}
}

export default PreferencesFF;