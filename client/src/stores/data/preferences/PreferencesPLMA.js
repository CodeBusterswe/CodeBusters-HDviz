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

	toJSON(){
		return {
			dimensions : this.dimensions,
			color : this.color ? this.color : "undefined",
		};
	}

	fromJSON(obj){
		this.dimensions = obj.dimensions;
		this.color = obj.color === "undefined" ? undefined : obj.color;
	}
}

export default PreferencesPLMA;