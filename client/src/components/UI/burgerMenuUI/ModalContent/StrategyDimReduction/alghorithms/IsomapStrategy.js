import AlgorithmStrategy from "../AlgorithmStrategy";
import * as dr from "@saehrimnir/druidjs";

class IsomapStrategy extends AlgorithmStrategy{
    
	startDR(parameters,data) {
		const matrix = dr.Matrix.from(data);
		let alg = new dr.ISOMAP(matrix, parameters.getNeighbors(), parameters.getDimensionsNumber());
		return alg.transform();
	}
}

export default IsomapStrategy;