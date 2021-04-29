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
		this[id] = value;
	}

	toJSON(){
		return {
			axis1 : this.axis1 ? this.axis1 : "undefined",
			axis2 : this.axis2 ? this.axis2 : "undefined",
			axis3 : this.axis3 ? this.axis3 : "undefined",
			axis4 : this.axis4 ? this.axis4 : "undefined",
			axis5 : this.axis5 ? this.axis5 : "undefined",
			SPMcolor : this.SPMcolor ? this.SPMcolor : "undefined",
		};
	}

	fromJSON(obj){
		this.axis1 = obj.axis1 === "undefined" ? undefined : obj.axis1;
		this.axis2 = obj.axis2 === "undefined" ? undefined : obj.axis2;
		this.axis3 = obj.axis3 === "undefined" ? undefined : obj.axis3;
		this.axis4 = obj.axis4 === "undefined" ? undefined : obj.axis4;
		this.axis5 = obj.axis5 === "undefined" ? undefined : obj.axis5;
		this.SPMcolor = obj.SPMcolor === "undefined" ? undefined : obj.SPMcolor;
	}
}

export default PreferencesSPM;