import AlgorithmStrategy from "../AlgorithmStrategy";
import * as dr from "@saehrimnir/druidjs";

class PcaStrategy extends AlgorithmStrategy{

	startDR(parameters,data) {		
		const matrix = dr.Matrix.from(data);
		let alg = new dr.PCA(matrix, parameters.getDimensionsNumber());
		return alg.transform();
	}
}

export default PcaStrategy;