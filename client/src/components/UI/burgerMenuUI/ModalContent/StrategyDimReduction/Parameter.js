export default class Parameter {
	#dimensionsNumber;
	constructor(parameters) {
		this.#dimensionsNumber = parameters.DimensionsNumber;
	}

	getDimensionsNumber(){
		return this.#dimensionsNumber;
	}
	
	getEpsilon() {
		throw new TypeError("Method 'getEpsilon()' must be implemented.");
	}

	getPerplexity() {
		throw new TypeError("Method 'getPerplexity()' must be implemented.");
	}

	getNeighbors() {
		throw new TypeError("Method 'getNeighbours()' must be implemented.");
	}

}	