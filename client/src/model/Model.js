import {makeObservable, observable, computed, action } from "mobx"
//import Dimension from "./Dimension";
class Model {
	constructor(){
		this.dimensions = [];
		this.originalData = [];
		this.selectedData = [];
		this.distanceMatrices = {};
		//tutti i metodi get dovrebbero essere computed e non action, ma per essere computed devono essere trasformati in getter
		//il vantaggio dei computed é che tengono in cache il valore, senza ricalcolarlo ogni volta, fino a quando la variabile observable non cambia
		makeObservable(this, {
			dimensions : observable,
			getDimensions: action,
			getDimensionsChecked: action,
			getCategoricCheckedDimensions: action,
			getNumericDimensions: action,
			getSelectedDimensions: action,
			loadDimensions: action,
			addDimensionsToDataset: action,
			reset: action
		})
		
	}
	addDistanceMatrix(matrix, matrixName) {
		this.distanceMatrices[matrixName] = matrix;
	}

	getDistanceMatrices() {
		return this.distanceMatrices;
	}

	isDataLoaded(){
		return this.dimensions.length === 0;
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
	//da fixare se si vuole che al cambiamento delle dimensioni restano quelle ridotte
	getSelectedDimensions() {
		return this.dimensions.filter(dim => dim.getChecked() && !dim.getIsReduced());
	}
    
	loadData(data) {
		this.originalData = [...data];
		console.log(this.originalData)
	}
	loadDimensions(dimensions){
		this.dimensions.replace(dimensions);	//metodo di mobx per array observable
	}
	updateSelectedData(selectedData){
		this.selectedData=selectedData;
	}

	addDimensionsToDataset(dimensions) {
		//this.dimensions.push(dimensions);
		this.dimensions.replace(this.dimensions.concat(dimensions));
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
		this.dimensions.clear();	//metodo di mobx per array observable
		this.selectedData = [];
	}   
}

export default Model