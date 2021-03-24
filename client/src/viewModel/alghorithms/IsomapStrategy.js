import AlghorithmStrategy from "../AlghorithmStrategy";
import * as dr from "@saehrimnir/druidjs";

class IsomapStrategy extends AlghorithmStrategy{
    
	startDR(parameters,data) {
		const matrix = dr.Matrix.from(data);
		let alg = new dr.ISOMAP(matrix, parameters.Neighbors, parameters.DimensionsNumber);
		return alg.transform();
	}
}

export default IsomapStrategy;