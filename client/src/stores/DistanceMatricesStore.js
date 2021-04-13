import {makeObservable, observable, computed, action } from "mobx";

class distanceMatricesStore {
	constructor(rootStore){
		this.distanceMatrices = [];
		this.rootStore = rootStore;
		makeObservable(this, {
			distanceMatrices: observable.shallow,
			distanceMatricesNames: computed,
			addDistanceMatrix: action
		});
	}

	addDistanceMatrix(matrix) {
		this.distanceMatrices.push(matrix);
	}

	getDistanceMatrixByName(matrixName){
		return this.distanceMatrices.filter(matrix => matrix.name === matrixName)[0];
	}
    
	reset(){
		this.distanceMatrices.clear();
	}
}

export default distanceMatricesStore;