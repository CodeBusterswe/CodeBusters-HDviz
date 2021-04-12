import { computed, makeObservable, observable, action } from "mobx";

export class ChartVM {
    
	show = true;

	constructor(rootStore){
    	this.preferencesStore = rootStore.preferencesStore;
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
}
