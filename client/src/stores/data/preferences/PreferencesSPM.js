import { makeAutoObservable } from "mobx";

class PreferencesSPM{
	constructor(){
		this.axis1 = undefined;
		this.axis2 = undefined;
		this.axis3 = undefined;
		this.axis4 = undefined;
		this.axis5 = undefined;
		this.SPMcolor = undefined;
		makeAutoObservable(this);
	}

	get axes(){
		return [this.axis1,this.axis2,this.axis3,this.axis4,this.axis5];
	}

	get color(){
		return this.SPMcolor;
	}

	setPreferenceById(id, value){
		console.log(id, value);
		this[id] = value;
	}

	serializeJSON(){
		//return json
	}

	deserializeJSON(string){
		//deserialize
	}
}

export default PreferencesSPM;