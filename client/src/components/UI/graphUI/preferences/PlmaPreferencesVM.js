import { makeAutoObservable } from "mobx";

export class PlmaPreferencesVM {

	constructor(rootStore){
		this.preferencesStore = rootStore.preferencesStore;
		this.datasetStore = rootStore.datasetStore;

    	makeAutoObservable(this,{preferencesStore : false, datasetStore : false}, {autoBind : true});
	}

	get keys(){
		return this.datasetStore.numericDimensions.map(d => {
			return {value: d.value, label: d.value};
		});
	}

	get colors(){
		return this.datasetStore.checkedDimensions.map((d) => d.value);
	}
    
	get userDimensions(){
		return this.preferencesStore.preferencesPlma.dimensions.map(d => {
			return {value: d, label: d};
		});
	}

	get userColor(){
		return this.preferencesStore.preferencesPlma.color;
	}

	handleSelectChange = (e) => {
		const value = e.target.value==="undefined" ? undefined : e.target.value,
			identifier = e.target.id;
		this.setPlmaPreferences(identifier, value);
	}

	setPlmaPreferences(identifier, value){
		switch(identifier){
		case "dimensions":
			this.preferencesStore.preferencesPlma.dimensions = value;
			break;
		case "color":
			this.preferencesStore.preferencesPlma.color = value;
			break;
		default:
		}
	}
	
	handleMultiSelectChange = (value, handler) => {
		switch(handler.action){
		case "select-option":
			this.setPlmaPreferences("dimensions", value.map(val => val.value));
			break;
		case "remove-value":
			this.setPlmaPreferences("dimensions", value.map(val => val.value));
			break;
		case "clear":
			this.setPlmaPreferences("dimensions", []);
			break;
		default:
		}
	}
}