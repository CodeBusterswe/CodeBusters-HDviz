import AlghorithmStrategy from "../AlghorithmStrategy";
import * as dr from "@saehrimnir/druidjs";

class LLEStrategy extends AlghorithmStrategy{

	startDR(parameters,data) {		
		const matrix = dr.Matrix.from(data);
		let alg = new dr.LLE(matrix, parameters.getNeighbors(), parameters.getDimensionsNumber());
		return alg.transform();
	}
}

export default LLEStrategy;