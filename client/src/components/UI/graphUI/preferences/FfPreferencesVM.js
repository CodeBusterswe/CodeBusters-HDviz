import { makeObservable, observable } from "mobx";

export class FfPreferencesVM {

	constructor(rootStore){
		this.preferencesStore = rootStore.preferencesStore;
		this.datasetStore = rootStore.datasetStore;
		this.distanceMatricesStore = rootStore.distanceMatricesStore;

    	makeObservable(this,{
			preferencesStore : observable
    	});
	}

	get keys(){
		return this.datasetStore.checkedDimensions;
	}
    
	get matrices(){
		return this.distanceMatricesStore.distanceMatricesNames;
	}
	
	get matrixName(){
		return this.preferencesStore.preferencesFf.distanceMatrix;
	}

	get order(){
		return this.preferencesStore.preferencesFf.orderBy;
	}

	get label(){
		return this.preferencesStore.preferencesFf.label;
	}

	get distMax(){
		return this.preferencesStore.preferencesFf.distMax;
	}

	get distMin(){
		return this.preferencesStore.preferencesFf.distMin;
	}

	getDistanceMatricesByName(matrixName){
		return this.distanceMatricesStore.getDistanceMatrixByName(matrixName);
	}

	get min(){
		return this.getDistanceMatricesByName(this.matrixName) ? Math.min.apply(Math,this.matrix.links.map(link =>link.value)) : undefined;
	} 

	get max(){
		return this.getDistanceMatricesByName(this.matrixName) ? Math.max.apply(Math,this.matrix.links.map(link =>link.value)) : undefined;
	}

	setFfPreferences(identifier, value){
		switch(identifier){
		case "distanceMatrix":
			this.preferencesStore.preferencesFf.distanceMatrix = value;
			break;
		case "color":
			this.preferencesStore.preferencesFf.color = value;
			break;
		case "distMax":
			this.preferencesStore.preferencesFf.distMax = value;
			break;
		case "distMin":
			this.preferencesStore.preferencesFf.distMin = value;
			break;
		default:
		}
	}

	handleSelectChange = (e) => {
		const value = e.target.value==="undefined" ? undefined : e.target.value,
			identifier = e.target.id;
		this.setFfPreferences(identifier, value);
	}
}