import { computed, makeObservable, observable } from "mobx";

export class AmPreferencesVM {

	constructor(rootStore){
		this.preferencesStore = rootStore.preferencesStore;
		this.datasetStore = rootStore.datasetStore;
		this.distanceMatricesStore = rootStore.distanceMatricesStore;

		this.matrixName = this.preferencesStore.preferencesAm.distanceMatrix;

    	makeObservable(this,{
			preferencesStore : observable,
			sorts : computed,
			matrices : computed,
			matrixName : computed,
			order : computed,
			label : computed,
			distMax : computed,
			distMin : computed,
			min : computed,
			max : computed
    	});
	}

	get sorts(){
		return this.datasetStore.checkedDimensions.map((d) => d.value);
	}
	
	get matrices(){
		return this.distanceMatricesStore.getDistanceMatricesNames;
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
		return this.getDistanceMatricesByName(this.matrixName) ? Math.min.apply(Math,this.matrix.links.map(link =>link.value)) : undefined;
	} 

	get max(){
		return this.getDistanceMatricesByName(this.matrixName) ? Math.max.apply(Math,this.matrix.links.map(link =>link.value)) : undefined;
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
		this.preferencesStore.preferencesAm.setAmPreferences(identifier, value);
	}
}