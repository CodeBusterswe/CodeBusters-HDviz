import { makeAutoObservable } from "mobx";
import {DistanceType} from "../../../../utils";
import DistanceMatrix from "../../../../stores/data/DistanceMatrix";
import * as distCalc from "ml-distance";
export class DistanceCalculationVM{
	constructor(rootStore, closeModal){
		this.datasetStore = rootStore.datasetStore;
    	this.distanceMatricesStore = rootStore.distanceMatricesStore;
    	this.dimensionsToRedux = this.datasetStore.numericDimensions.map(d => {return {value: d.value, label: d.value};}).slice(0,2);
		this.optionList = this.datasetStore.numericDimensions.map(d => {return {value: d.value, label: d.value};});
		this.distanceType = DistanceType.Euclidean;
		this.newDistanceMatrixName = DistanceType.Euclidean;
		this.nameError = false;
		this.closeModal = closeModal.bind(null);
		makeAutoObservable(this, {datasetStore: false, distanceMatricesStore: false}, {autoBind: true}); 
	}
    
    handleSubmit = e =>{
    	e.preventDefault();
    	try{
    		const data = this.datasetStore.selectedData.map(obj => this.dimensionsToRedux.map((dim) => obj[dim.value]));
    		if(this.distanceMatricesStore.getDistanceMatrixByName(this.newDistanceMatrixName))
    			throw new Error("The name is already in use. Please choose a different one.");
    		let matrix = new DistanceMatrix();
    		matrix.name = this.newDistanceMatrixName;
    		for (let i = 0; i < data.length; i++) {
    			for (let j = i+1; j < data.length; j++) {
    				let link = {
    					source : "node"+i,
    					target : "node"+j,
    					value: distCalc.distance[this.distanceType](data[i], data[j])
    				};
    				matrix.pushLink(link);
    			}
    			let node = {...this.datasetStore.selectedData[i]};
    			node.id="node"+i;
    			matrix.pushNode(node);
    		}	
    		this.distanceMatricesStore.addDistanceMatrix(matrix);
    		this.closeModal();
    	}catch(e){
    		this.nameError=true;
    		console.log(e);
    	}
    }
	handleChangeDistanceType = e => {
		this.newDistanceMatrixName=e.target.value;
		this.distanceType = e.target.value;
		this.nameError=false;
	}

	handleChangeNewDistanceMatrixName(e){
		this.nameError=false;
		this.newDistanceMatrixName=e.target.value;
	}

	handleChangeDimensionsToRedux = (value, handler) =>{
		switch(handler.action){
		case "select-option":
			this.dimensionsToRedux = value;
			return;
		case "remove-value":
			if(value.length >= 2)
				this.dimensionsToRedux = value;
			return;
		case "clear":
			this.dimensionsToRedux = this.dimensionsToRedux.slice(0,2);
			return;
		default:
			return;
		}
	}

}