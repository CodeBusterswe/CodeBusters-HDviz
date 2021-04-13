import { makeAutoObservable } from "mobx";
class PreferencesPLMA{

	constructor(){
		this._dimensions = [];
		this._color = undefined;
		makeAutoObservable(this);
	}

	get dimensions(){
		return this._dimensions;
	}

	get color(){
		return this._color;
	}

	set dimensions(value){
		this._dimensions = value; 
	}

	set color(value){
		this._color = value;
	}

	serializeJSON(){
		//return json
	}

	deserializeJSON(string){
		//deserialize
	}
}

export default PreferencesPLMA;