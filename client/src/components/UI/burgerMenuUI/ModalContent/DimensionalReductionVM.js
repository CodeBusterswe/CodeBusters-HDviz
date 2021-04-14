import { makeAutoObservable } from "mobx";
import {AlgorithmType} from "../../../../utils";
import Dimension from "../../../../stores/data/Dimension";
import DimReduction from "./StrategyDimReduction/DimReduction";
export class DimensionalReductionVM{
	constructor(rootStore, closeModal){
		this.datasetStore = rootStore.datasetStore;
    	this.dimensionsToRedux = this.datasetStore.numericDimensions.map(d => {return {value: d.value, label: d.value};}).slice(0,2);
		this.optionList = this.datasetStore.numericDimensions.map(d => {return {value: d.value, label: d.value};});
		this.algorithmType = AlgorithmType.FastMap;
		this.newDimensionsName = AlgorithmType.FastMap;
		this.newDimensionsNumber = 2;
		this.neighbors = 30;
		this.perplexity = 30;
		this.epsilon = 10;
		this.nameError = false;
		this.closeModal = closeModal.bind(null);
		makeAutoObservable(this, {datasetStore: false}, {autoBind: true}); 
	}

    handleSubmit = (e) =>{
    	e.preventDefault();
    	try{
    		const data = this.datasetStore.selectedData.map(obj => this.dimensionsToRedux.map((dim) => obj[dim.value]));
    		const parameters = {
    			Name: this.newDimensionsName,
    			DimensionsNumber: this.newDimensionsNumber,
    			Neighbors: this.neighbors,
    			Perplexity: this.perplexity,
    			Epsilon: this.epsilon
    		};
		    if(this.datasetStore.dimensions.some(dim => dim.value.slice(0, -1) === parameters.Name) || this.newDimensionsName ==="")
			    throw new Error("The name is already in use. Please choose a different one.");
    		//*******************************************************************
		    const drStrategy = new DimReduction();

		    drStrategy.setStrategy(this.algorithmType);
		    drStrategy.setData(data);
		    drStrategy.setParameters(parameters);

    		const reduction = drStrategy.executeStrategy();
		
    		let newDimsFromReduction = [];
    		for (let i = 1; i <= reduction._cols; i++) {
    			let d = new Dimension(parameters.Name+i);
    			d.isReduced = true;
	  		newDimsFromReduction.push(d);
    		}

    		let newDataFromReduction = this.datasetStore.selectedData;				
    		for(let i = 0; i<newDataFromReduction.length; i++){
    			let d = newDataFromReduction[i];
    			let j=0;
    			newDimsFromReduction.forEach(dim => {
			        d[dim.value] = reduction.to2dArray[i][j];
			        j++;
    			});
    		}
    		this.datasetStore.addDimensionsToDataset(newDimsFromReduction);
    		this.closeModal();
    	}catch(e){
    		this.nameError = true;
    	}
    }
	handleChangeNeighbours = (e) =>{
		this.neighbors = e.target.value;
	}
	handleChangeAlgorithmType = (e) =>{
		this.newDimensionsName = e.target.value;
		this.algorithmType = e.target.value;
		this.neighbors = 30;
		this.newDimensionsNumber = 2;
		this.epsilon = 10;
		this.perplexity = 50;
	}
	handleChangeNewDimensionsName = (e) =>{
		this.nameError = false;
		this.newDimensionsName = e.target.value;
	}
	handleChangeNewDimensionsNumber = (e) =>{
		this.newDimensionsNumber = e.target.value;
	}
	handleChangePerplexity = (e) =>{
		this.perplexity = e.target.value;
	}
	handleChangeEspilon = (e) =>{
		this.epsilon = e.target.value;
	}
	handleChangeDimensionsToRedux (value, handler){
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