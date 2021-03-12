import { makeAutoObservable } from "mobx"

import Dimension from './Dimension';
import Dimensions from './Dimensions';

class Model {
    
    //tutte le strutture dati, quindi array per dimensioni, dati delle dimensioni, dimensioni selezionate, dimensioni ridotte, 

    dim = new Dimension();
    dims = new Dimensions();

    constructor(){
        makeAutoObservable(this)
    }

    getDimensions(){
        return this.dims;
    }

    /*
    constructor(){
        dimensions = new Dimensions();
        originalData = [];
        selectedData = [];
        makeAutoObservable(this);
    }

    getDimensions() {
        return this.dimensions;
    }

    getOriginalData() {
        return this.originalData;
    }

    getSelectedData() {
        return this.selectedData;
    }

    getNumericDimensions() {
        return this.dimensions.filter(dim => dim.isNumeric && dim.isChecked && dim.toRedux) //is o to redux?
                              .map(d => d.value);
    }

    getSelectedDimensions() {
        return this.dimensions.filter(dim => dim.isChecked && !dim.isRedux) //is o to redux?
                              .map(d => d.value);
    }
    */
       
}

export default Model