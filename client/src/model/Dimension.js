// import vari

class Dimension{
	constructor(value = "dims", isChecked = true, isNumeric=true, isRedux = false){
		this.value = value;
		this._isChecked = isChecked;
		this._isNumeric = isNumeric;
		this._isRedux = isRedux;
	}

	isChecked(bool) {
		this._isChecked = bool;
	}
	set value(value){
		this.#value = value;
	}
	set isChecked(bool) {
		this.#isChecked = bool;
	}

	isReduced(bool) {
		this._isRedux = bool;
	}

	toReduce(bool) {
		this._toRedux = bool;
	}

	getValue() {
		return this.value;
	}
	
	getChecked() {
		return this._isChecked;
	}

	getNumeric() {
		return this._isNumeric;
	}

	getToReduce() {
		return this._toRedux;
	}

	getIsReduced() {
		return this._isRedux;
	}
}
export default Dimension;