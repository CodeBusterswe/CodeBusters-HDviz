import AlghorithmStrategy from "../AlghorithmStrategy";
import * as dr from "@saehrimnir/druidjs";

class TsneStrategy extends AlghorithmStrategy{

	startDR(parameters,data) {
		const matrix = dr.Matrix.from(data);
		let alg = new dr.TSNE(matrix, parameters.getPerplexity(), parameters.getEpsilon(), parameters.getDimensionsNumber());
		return alg.transform();
	}
}

export default TsneStrategy;