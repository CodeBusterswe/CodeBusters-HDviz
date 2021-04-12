import { computed, makeObservable, observable, action } from "mobx";

export class ChartVM {
    
	show = true;

	constructor(rootStore){
    	this.preferencesStore = rootStore.preferencesStore;
		this.datasetStore = rootStore.datasetStore;
    	makeObservable(this,{
			show : observable,
			chartToShow : computed,
			showChart : computed,
			handlePref : action
    	});
	}

	handlePref() {
		this.show = !this.show;
	}

	get chartToShow(){
		return this.preferencesStore.chart;
	}

	get showChart(){
		return this.show;
	}
	get dimensions(){
		return this.datasetStore.dimensions;
	}
	get data(){
		return this.datasetStore.originalData;
	}
	get selData(){
		return this.datasetStore.selectedData;
	}
}
