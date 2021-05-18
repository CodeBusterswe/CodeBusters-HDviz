import IsomapParameter from "./IsomapParameter";

export default class UmapParameter extends IsomapParameter {
	#localConnection;
	#minDist;
	constructor(parameters){
		super(parameters);
		this.#localConnection = parameters.LocalConnection;
		this.#minDist = parameters.MinDistance;
	}

	getLocalConnection() {
		return this.#localConnection;
	}

	getMinDist() {
		return this.#minDist;
	}
}