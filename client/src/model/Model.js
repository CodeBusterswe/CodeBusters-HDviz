import { makeAutoObservable } from "mobx"

import Dimension from './Dimension';
import Dimensions from './Dimensions';

class Model {
    
    constructor(){
        dimensions = [];
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
    //viewModel?
    getNumericDimensions() {
        return this.dimensions.filter(dim => dim.isNumeric && dim.isChecked && dim.toRedux)
                              .map(d => d.value);
    }
    //viewModel?
    getSelectedDimensions() {
        return this.dimensions.filter(dim => dim.isChecked && !dim.isRedux) 
                              .map(d => d.value);
    }
    
    loadData(dimensions, data) {
        this.originalData = data;
        this.dimensions = dimensions;
        this.selectedData = data;
    }

    addDimensionToDataset(dimension, data) {
        this.dimensions.push(dimension);
        this.getSelectedData.push(data);
    }

    //assumo che siano nello stesso ordine 
    removeDimensionToDataset(dimension) {
        const pos = this.dimensions.indexOf(dimension);
        if(pos > -1) {
            this.dimensions.splice(pos,1);
            this.selectedData.splice(pos,1);
        }
    }

    reset() {
        this.originalData = [];
        this.dimensions = [];
        this.selectedData = [];
    }   
}

export default Model