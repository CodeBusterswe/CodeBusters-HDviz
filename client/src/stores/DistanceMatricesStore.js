import {makeObservable, observable, computed, action } from "mobx";

class DistanceMatricesStore {
	constructor(rootStore){
		this.distanceMatrices = [];
		this.rootStore = rootStore;
		makeObservable(this, {
			distanceMatrices: observable.shallow,
			distanceMatricesNames: computed,
			addDistanceMatrix: action
		});
	}

	get dm(){
		return this.distanceMatrices;
	}

	addDistanceMatrix(matrix) {
		this.distanceMatrices.push(matrix);
	}

	getDistanceMatrixByName=(matrixName)=>{
		return this.distanceMatrices.filter(matrix => matrix.name === matrixName)[0];
	}
    
	get distanceMatricesNames(){
		return this.distanceMatrices.map(matrix => matrix.name);
	}
	reset(){
		this.distanceMatrices.clear();
	}
}

export default DistanceMatricesStore;