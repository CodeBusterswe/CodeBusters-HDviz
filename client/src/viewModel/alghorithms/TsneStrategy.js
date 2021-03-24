import AlghorithmStrategy from "../AlghorithmStrategy";
import * as dr from "@saehrimnir/druidjs";

class TsneStrategy extends AlghorithmStrategy{

	startDR(parameters,data) {
		const matrix = dr.Matrix.from(data);
		let alg = new dr.TSNE(matrix, parameters.Perplexity, parameters.Epsilon, parameters.DimensionsNumber);
		return alg.transform();
	}
}

export default TsneStrategy;