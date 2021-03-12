import Dimension from './Dimension'

class Dimensions{
    constructor(){
        this.dimensions = [];
    }
    addDimension(value = "dims", isChecked = true, isNumeric=true, isRedux = false, toRedux = true){
        let d = new Dimension(value, isChecked, isNumeric, isRedux, toRedux);
        this.dimensions.push(d);
    }
    get allDimensionsName(){
        return this.dimensions.map(d => d.value())
    }

    //metodi per manipolare la classe
}
export default Dimensions