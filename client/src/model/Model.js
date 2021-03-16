import { makeAutoObservable } from "mobx"

//import Dimension from "./Dimension";

class Model {
	
	constructor(){
		this.showSPM = false;
		this.dimensions = [];
		this.originalData = [];
		this.selectedData = [];
		this.distanceMatrices = [];
		makeAutoObservable(this);
	}

	addDistanceMatrix(matrix) {
		this.distanceMatrices.push(matrix);
	}

	getDistanceMatrices() {
		return this.distanceMatrices;
	}

	getShowSPM(){
		return this.showSPM;
	}

	isDataLoaded(){
		return this.dimensions.length === 0;
	}
	setShowSPM(){
		this.showSPM = !this.showSPM;
	}

	getDimensions() {
		return this.dimensions;
	}

	getDimensionsChecked(){
		return this.dimensions.filter(dim => dim.getChecked());
	}

	getCategoricCheckedDimensions(){
		return this.dimensions.filter(dim => dim.getChecked() && !dim.getNumeric());
	}

	getOriginalData() {
		return this.originalData;
	}

	getSelectedData() {
		return this.selectedData;
	}
    
	getNumericDimensions() {
		return this.dimensions.filter(dim => dim.getChecked() && dim.getNumeric());
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

	addDimensionsToDataset(dimensions) {
		this.dimensions = this.dimensions.concat(dimensions);
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