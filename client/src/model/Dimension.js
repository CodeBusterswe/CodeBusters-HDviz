// import vari

class Dimension{
    constructor(value = "dims", isChecked = true, isNumeric=true, isRedux = false, toRedux = true){
        this._value = value;
        this._isChecked = isChecked;
        this._isNumeric = isNumeric;
        this._isRedux = isRedux;
        this._toRedux = toRedux;
    }
}
export default Dimension