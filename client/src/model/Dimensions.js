// import vari

class Dimension{
    constructor(value = "dims", isChecked = true, isNumeric=true, isRedux = false, toRedux = true){
        this.value = value;
        this.isChecked = isChecked;
        this.isNumeric = isNumeric;
        this.isRedux = isRedux;
        this.toRedux = toRedux;
    }
    get value(){
        return this.value;
    }

    //metodi per manipolare la classe
}