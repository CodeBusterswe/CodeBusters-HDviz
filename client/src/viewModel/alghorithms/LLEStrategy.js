import AlgorithmInterface from "./../AlghorithmInterface";
import * as dr from "@saehrimnir/druidjs";

class LLEStrategy extends AlgorithmInterface{
    
	//stessi campi dati di AlgorithmStrategy
	constructor() {
		super();
		this.result = null;
		this.matrix = null;
	}

	startDR(parameters,data) {		
		const matrix = dr.Matrix.from(data);
		let alg = new dr.LLE(matrix, parameters.Neighbors, parameters.DimensionsNumber);
		return alg.transform();
	}
}

export default LLEStrategy;