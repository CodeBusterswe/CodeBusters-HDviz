import AlghorithmStrategy from "../AlghorithmStrategy";
import * as dr from "@saehrimnir/druidjs";

class FastmapStrategy extends AlghorithmStrategy{

	startDR(parameters,data) {
		const matrix = dr.Matrix.from(data);
		let alg = new dr.FASTMAP(matrix, parameters.getDimensionsNumber());
		return alg.transform();
	}
}

export default FastmapStrategy;