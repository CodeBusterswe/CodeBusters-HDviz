import {makeObservable, observable, computed, action } from "mobx";
import Dimension from "./data/Dimension";
class DatasetStore {
	constructor(rootStore){
		this.dimensions = [];
		this.originalData = [];
		this.selectedData = [];
		this.rootStore = rootStore;
		makeObservable(this, {
			originalData : observable.shallow,
			selectedData : observable.shallow,
			dimensions : observable,
			checkedDimensions: computed,
			categoricCheckedDimensions: computed,
			numericDimensions: computed,
			selectedDimensions: computed,
			loadDimensions: action,
			updateSelectedData: action,
			loadData: action,
			addDimensionsToDataset: action,
			reset: action,
			fromJSON: action
		});
	}
	isDataLoaded(){
		return this.dimensions.length === 0;
	}

	get checkedDimensions(){
		return this.dimensions.filter(dim => dim.isChecked);
	}

	get categoricCheckedDimensions(){
		return this.dimensions.filter(dim => dim.isChecked && !dim.isNumeric);
	}
    
	get numericDimensions() {
		return this.dimensions.filter(dim => dim.isChecked && dim.isNumeric);
	}
	get notReducedDimensions(){
		return this.dimensions.filter(dim => !dim.isReduced);
	}
	get selectedDimensions() {
		return this.dimensions.filter(dim => dim.isChecked && !dim.isReduced);
	}
    
	loadData(data) {
		this.originalData.replace(data);
	}
	loadDimensions(dimensions){
		this.dimensions.replace(dimensions);	//metodo di mobx per array observable
	}
	haveNotANumberValue(datasetRow) {
		return !Object.values(datasetRow).some(value => Number.isNaN(value) || value === undefined || value===null);
	}
	updateSelectedData(){
		//con filter tolgo i dati che hanno alcune dimensioni numeriche selezionate NaN; e con map prendo le dimensioni selezionate
		let selectedData = this.originalData.map(d => {
			return Object.fromEntries(this.selectedDimensions.map(dim => [dim.value, d[dim.value]]));
	 	}).filter(this.haveNotANumberValue);
		this.loadDimensions(this.notReducedDimensions);
		this.selectedData.replace(selectedData);
	}

	addDimensionsToDataset(dimensions){
		this.dimensions.replace(this.dimensions.concat(dimensions));
	}

	reset(){
		this.originalData.clear();
		this.dimensions.clear();	//metodo di mobx per array observable
		this.selectedData.clear();
	}   

	toJSON(){
		return {dimensions: this.dimensions, data: this.originalData, selected: this.selectedData};
	}
	fromJSON(store){
		this.dimensions.replace(store.dimensions.map(dim => {
			return new Dimension(dim._value, dim._isChecked, dim._isNumeric, dim._isReduced);
		}));
		this.originalData.replace(store.data);
		this.selectedData.replace(store.selected);
	}
}

export default DatasetStore;