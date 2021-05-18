import AlgorithmStrategy from "../AlgorithmStrategy";
import * as dr from "@saehrimnir/druidjs";

class UmapStrategy extends AlgorithmStrategy{

	startDR(parameters,data) {
		const matrix = dr.Matrix.from(data);
		let alg = new dr.UMAP(matrix, parameters.getNeighbors(), parameters.getLocalConnection(), parameters.getMinDist(), parameters.getDimensionsNumber());
		return alg.transform();
	}
}

export default UmapStrategy;