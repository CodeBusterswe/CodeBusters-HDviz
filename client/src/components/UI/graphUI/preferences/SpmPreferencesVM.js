import { computed, makeObservable } from "mobx";

export class SpmPreferencesVM {

	labels = ["Axis one", "Axis two", "Axis Three", "Axis Four", "Axis Five"];
	identifiers = ["axis1", "axis2", "axis3", "axis4", "axis5"];

	constructor(rootStore){
    	this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;

    	makeObservable(this,{
			dimensions : computed,
			spmPreferences : computed
    	});
	}

	get color(){
		return this.preferencesStore.preferencesSpm.color;
	}

	get axes(){
		return this.preferencesStore.preferencesSpm.axes;
	}
	
	//Funzione che non permette di selezionare più volte la stessa dimensione
	handleSelectChange = e => {
		const identifier = e.target.id;
		const value = e.target.value==="undefined" ? undefined : e.target.value;
		console.log(identifier, value);
		this.preferencesStore.preferencesSpm.setPreferenceById(identifier, value);
	}

	get dimensions(){
		return this.datasetStore.checkedDimensions.map(dim => dim.value);
	}

	get spmPreferences(){
		return [this.preferencesStore.preferencesSpm.axes, this.preferencesStore.preferencesSpm.color];
	}

}
