class PreferencesAM{
	constructor(){
		this._distanceMatrix = undefined;
		this._orderBy = undefined;
		this._label = undefined;
		this._distMax = Infinity;
		this._distMin = 0;
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
		this._value = value;
	}
	
	set distMax(value){
		this._distMax = value;
	}
	
	set distMin(value){
		this._distMin = value;
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