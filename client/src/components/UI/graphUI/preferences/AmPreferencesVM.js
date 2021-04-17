import { makeAutoObservable } from "mobx";

export class AmPreferencesVM {

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
			{autoBind : true}
		);
	}

	get sorts(){
		return this.datasetStore.checkedDimensions.map((d) => d.value);
	}
	
	get matrices(){
		return this.distanceMatricesStore.distanceMatricesNames;
	}

	get matrixName(){
		return this.preferencesStore.preferencesAm.distanceMatrix;
	}

	get order(){
		return this.preferencesStore.preferencesAm.orderBy;
	}

	get label(){
		return this.preferencesStore.preferencesAm.label;
	}

	get distMax(){
		return this.preferencesStore.preferencesAm.distMax;
	}

	get distMin(){
		return this.preferencesStore.preferencesAm.distMin;
	}

	getDistanceMatricesByName = (matrixName) => {
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
    
	setAmPreferences(identifier, value){
		switch(identifier){
		case "distanceMatrix":
			this.preferencesStore.preferencesAm.distanceMatrix = value;
			break;
		case "orderBy":
			this.preferencesStore.preferencesAm.orderBy = value;
			break;
		case "label":
			this.preferencesStore.preferencesAm.label = value;
			break;
		case "distMax":
			this.preferencesStore.preferencesAm.distMax = value;
			break;
		case "distMin":
			this.preferencesStore.preferencesAm.distMin = value;
			break;
		default:
		}
	}

	handleSelectChange = (e) => {
		const value = e.target.value==="undefined" ? undefined : e.target.value,
			identifier = e.target.id;
		this.setAmPreferences(identifier, value);
	}
}