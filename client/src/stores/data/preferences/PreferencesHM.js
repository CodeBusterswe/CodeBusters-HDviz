class PreferencesHM{
	constructor(){
		this._xAxis = undefined;
		this._yAxis = undefined;
		this._heat = undefined;
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

	serializeJSON(){
		//return json
	}

	deserializeJSON(string){
		//deserialize
	}
}

export default PreferencesHM;