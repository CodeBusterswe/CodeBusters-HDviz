class AlgorithmStrategy {
    
	constructor() {
    	if (this.constructor === AlgorithmStrategy) {
    		throw new TypeError("Abstract classes can't be instantiated.");
    	}
	}

	startDR() {
    	throw new TypeError("Method 'startDR()' must be implemented.");
	}

}

export default AlgorithmStrategy;