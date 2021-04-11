class PreferencesAM{
	constructor(){
		this.distanceMatrix = undefined;
		this.orderBy = undefined;
		this.label = undefined;
		this.distMax = Infinity;
		this.distMin = 0;
	}

	serializeJSON(){
		//return json
	}

	deserializeJSON(string){
		this.distanceMatrix = undefined;
		this.orderBy = undefined;
		this.label = undefined;
		this.distMax = Infinity;
		this.distMin = 0;
	}
}

export default PreferencesAM;