import { makeAutoObservable } from "mobx";

export class FfPreferencesVM {

	constructor(rootStore){
		this.preferencesStore = rootStore.preferencesStore;
		this.datasetStore = rootStore.datasetStore;
		this.distanceMatricesStore = rootStore.distanceMatricesStore;

    	makeAutoObservable(
			this, 
			{
				preferencesStore : false, 
				datasetStore : false, 
				distanceMatricesStore : false
			}, 
			{autoBind : true});
	}

	get keys(){
		return this.datasetStore.checkedDimensions.map(d => d.value);
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
		const matrix = this.getDistanceMatricesByName(this.matrixName);
		return matrix ? Math.min.apply(Math, matrix.links.map(link =>link.value)) : undefined;
	} 

	get max(){
		const matrix = this.getDistanceMatricesByName(this.matrixName);
		return matrix ? Math.max.apply(Math, matrix.links.map(link =>link.value)) : undefined;
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