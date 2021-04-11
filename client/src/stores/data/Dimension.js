class Dimension{
	#value;
	#isChecked;
	#isNumeric;
	#isRedux;
	constructor(value = "dims", isChecked = true, isNumeric=true, isRedux = false){
		this.#value = value;
		this.#isChecked = isChecked;
		this.#isNumeric = isNumeric;
		this.#isRedux = isRedux;
	}

	set isChecked(bool) {
		this.#isChecked = bool;
	}

	set isNumeric(bool) {
		this.#isNumeric = bool;
	}

	set isReduced(bool) {
		this.#isRedux = bool;
	}

	get value() {
		return this.#value;
	}
	
	get isChecked() {
		return this.#isChecked;
	}

	get isNumeric() {
		return this.#isNumeric;
	}

	get isReduced() {
		return this.#isRedux;
	}
}
export default Dimension;