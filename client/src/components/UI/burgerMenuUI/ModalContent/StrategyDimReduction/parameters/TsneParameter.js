import Parameter from "./../Parameter"; 

export default class TsneParameter extends Parameter {
	#perplexity;
	#epsilon;
	constructor(parameters){
		super(parameters);
		this.#perplexity = parameters.Perplexity;
		this.#epsilon = parameters.Epsilon;
	}

	getPerplexity() {
		return this.#perplexity;
	}

	getEpsilon() {
		return this.#epsilon;
	}
}