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

	getLocalConnection() {
		throw new TypeError("Method 'getLocalConnection()' must be implemented.");
	}

	getMinDist() {
		throw new TypeError("Method 'getMinDist()' must be implemented.");
	}

}	