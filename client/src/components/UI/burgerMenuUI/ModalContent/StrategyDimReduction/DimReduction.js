import { AlgorithmType } from "../../../../../utils";
import IsomapStrategy from "./alghorithms/IsomapStrategy";
import FastmapStrategy from "./alghorithms/FastmapStrategy";
import LLEStrategy from "./alghorithms/LLEStrategy";
import TsneStrategy from "./alghorithms/TsneStrategy";
import FastmapParameter from "./parameters/FastmapParameter";
import IsomapParameter from "./parameters/IsomapParameter";
import LLEParameter from "./parameters/LLEParameter";
import TsneParameter from "./parameters/TsneParameter";

class DimReduction {
	constructor() {
    	this.strategy = null;
    	this.parameters = null;
    	this.data = null;
	}

	setStrategy(algorithm,parameters) {
		if(algorithm === AlgorithmType.IsoMap) {
			this.strategy = new IsomapStrategy();
			this.parameters = new IsomapParameter(parameters);
		}
		if(algorithm === AlgorithmType.FastMap) {
			this.strategy = new FastmapStrategy();
			this.parameters = new FastmapParameter(parameters);
		}
		if(algorithm === AlgorithmType.LLE) {
			this.strategy = new LLEStrategy();
			this.parameters = new LLEParameter(parameters);
		}
		if(algorithm === AlgorithmType.tSNE) {
			this.strategy = new TsneStrategy();
			this.parameters = new TsneParameter(parameters);
		}	
	}

	setData(data) {
    	this.data = data;
	}

	executeStrategy() {
    	return this.strategy.startDR(this.parameters, this.data);
	}
}

export default DimReduction;