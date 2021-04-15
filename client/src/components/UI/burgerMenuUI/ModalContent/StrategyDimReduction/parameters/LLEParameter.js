import Parameter from "./../Parameter"; 

export default class LLEParameter extends Parameter {
	#neighbors;
	constructor(parameters){
		super();
		this.#neighbors = parameters.Neighbors;
	}

	getNeighbors() {
		return this.#neighbors;
	}
}