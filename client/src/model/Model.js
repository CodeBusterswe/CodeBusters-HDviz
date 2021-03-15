import { makeAutoObservable } from "mobx"

import Dimension from "./Dimension";

class Model {
	
	constructor(){
		this.dimensions = [];
		this.originalData = [];
		this.selectedData = [];
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
		return this.dimensions.filter(dim => dim.getChecked() && dim.getNumeric() && dim.getToReduce());
	}
    
	getSelectedDimensions() {
		return this.dimensions.filter(dim => dim.getChecked() && !dim.getIsReduced());
	}
    
	loadData(dimensions, data) {
		this.originalData = data;
		this.dimensions = dimensions;
	}
	loadDimensions(dimensions){
		this.dimensions = dimensions;
	}
	updateSelectedData(selectedData){
		this.selectedData=selectedData;
	}

	addDimensionsToDataset(dimensions, data) {
		this.dimensions = this.dimensions.concat(dimensions);
		this.selectedData = data;
	}

	//se non serve calncellare
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