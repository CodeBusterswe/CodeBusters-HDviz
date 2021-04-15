import Parameter from "./../Parameter"; 

export default class IsomapParameter extends Parameter {
	#neighbors;
	constructor(parameters){
		super(parameters);
		this.#neighbors = parameters.Neighbors;
	}

	getNeighbors() {
		return this.#neighbors;
	}
}