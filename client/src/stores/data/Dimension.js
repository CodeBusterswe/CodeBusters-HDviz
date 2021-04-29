import { makeAutoObservable} from "mobx";

class Dimension{
	constructor(value = "dims", isChecked = true, isNumeric=true, isRedux = false){
		this._value = value;
		this._isChecked = isChecked;
		this._isNumeric = isNumeric;
		this._isRedux = isRedux;
		makeAutoObservable(this);
	}

	set isChecked(bool) {
		this._isChecked = bool;
	}

	set isNumeric(bool) {
		this._isNumeric = bool;
	}

	set isReduced(bool) {
		this._isRedux = bool;
	}

	get value() {
		return this._value;
	}
	
	get isChecked() {
		return this._isChecked;
	}

	get isNumeric() {
		return this._isNumeric;
	}

	get isReduced() {
		return this._isRedux;
	}

}
export default Dimension;