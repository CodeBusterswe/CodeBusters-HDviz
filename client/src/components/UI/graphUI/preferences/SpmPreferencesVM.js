import { computed, makeObservable } from "mobx";

export class SpmPreferencesVM {

	labels = ["Asse uno", "Asse due", "Asse tre", "Asse quattro", "Asse cinque"];
	identifiers = ["axis1", "axis2", "axis3", "axis4", "axis5"];

	constructor(rootStore){
    	this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;

    	makeObservable(this,{
			dimensions : computed
    	});
	}

	get color(){
		return this.preferencesStore.preferencesSpm.color;
	}

	get axes(){
		return this.preferencesStore.preferencesSpm.axes;
	}
	
	handleSelectChange = e => {
		const identifier = e.target.id;
		const value = e.target.value==="undefined" ? undefined : e.target.value;
		this.preferencesStore.preferencesSpm.setPreferenceById(identifier, value);
	}

	get dimensions(){
		return this.datasetStore.checkedDimensions.map(dim => dim.value);
	}

}
