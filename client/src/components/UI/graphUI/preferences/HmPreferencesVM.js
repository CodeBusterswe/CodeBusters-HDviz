import { makeAutoObservable } from "mobx";

export class HmPreferencesVM {

    labels = ["Asse X", "Asse Y", "Colore"];
	identifiers = ["xAxis", "yAxis", "heat"];

	constructor(rootStore){
		this.preferencesStore = rootStore.preferencesStore;
		this.datasetStore = rootStore.datasetStore;

    	makeAutoObservable(
			this,
			{
				preferencesStore : false,
				datasetStore : false
    		},
			{autoBind : true}
		);
	}

	get keys(){
		return this.datasetStore.checkedDimensions.map(d => d.value);
	}

	get values(){
		return {
			xAxis : this.preferencesStore.preferencesHm.xAxis,
			yAxis : this.preferencesStore.preferencesHm.yAxis,
			heat : this.preferencesStore.preferencesHm.heat
		};
	}
	
	setHmPreferences(identifier, value){
		switch(identifier){
		case "xAxis":
			this.preferencesStore.preferencesHm.xAxis = value;
			break;
		case "yAxis":
			this.preferencesStore.preferencesHm.yAxis = value;
			break;
		case "heat":
			this.preferencesStore.preferencesHm.heat = value;
			break;
		default:
		}
	}

	handleSelectChange = (e) => {
		const value = e.target.value==="undefined" ? undefined : e.target.value,
			identifier = e.target.id;
		this.setHmPreferences(identifier, value);
	}

}