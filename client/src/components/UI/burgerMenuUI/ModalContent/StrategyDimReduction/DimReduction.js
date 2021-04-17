class DimReduction {
	constructor() {
		this.strategy = null;
	}

	setStrategy(algorithm) {
		this.strategy = algorithm;
	}

	executeStrategy(params, data) {
    	return this.strategy.startDR(params, data);
	}
}

export default DimReduction;