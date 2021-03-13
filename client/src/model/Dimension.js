// import vari

class Dimension{
    constructor(value = "dims", isChecked = true, isNumeric=true, isRedux = false, toRedux = true){
        this._value = value;
        this._isChecked = isChecked;
        this._isNumeric = isNumeric;
        this._isRedux = isRedux;
        this._toRedux = toRedux;
    }

    isChecked(bool) {
        this._isChecked = bool;
    }

    isNumeric(bool) {
        this._isNumeric = bool;
    }

    isReduced(bool) {
        this._isRedux = bool;
    }

    toReduce(bool) {
        this._toRedux = bool;
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
export default Dimension