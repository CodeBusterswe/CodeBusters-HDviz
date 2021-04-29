import {makeObservable, observable, computed, action } from "mobx";
class DatasetStore {
	constructor(rootStore, init){
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
			reset: action
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
	fromJSON(json){
		let temp = JSON.parse(json);
		this.dimensions.replace(temp.dimensions);
		this.originalData.replace(temp.data);
		this.selectedData.replace(temp.selected);
	}
}

export default DatasetStore;