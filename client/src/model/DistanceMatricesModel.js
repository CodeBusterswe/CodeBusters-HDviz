import {makeObservable, observable, computed, action } from "mobx";
class DistanceMatricesModel {
	#distanceMatrices;
	constructor(){
		this.#distanceMatrices = [];
		this.distanceNames = [];
		makeObservable(this, {
			distanceNames: observable,
			distanceMatricesNames: computed,
			addDistanceMatrix: action
		});
	}
	addDistanceMatrix(matrix, matrixName) {
		this.#distanceMatrices.push(matrix);
		this.distanceNames.push(matrixName);
	}
	getDistanceMatricesByName(matrixName){
		return this.#distanceMatrices.filter(matrix => matrix.name === matrixName)[0];
	}
	get distanceMatrices() {
		return this.#distanceMatrices;
	}
	get distanceMatricesNames(){
		return this.distanceNames;
	}
	reset(){
		this.#distanceMatrices = [];
		this.distanceNames.clear();
	}
}export default DistanceMatricesModel;