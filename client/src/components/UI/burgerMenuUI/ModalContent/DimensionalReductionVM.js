import { makeAutoObservable } from "mobx";
import {AlgorithmType} from "../../../../utils";
import Dimension from "../../../../stores/data/Dimension";
import DimReduction from "./StrategyDimReduction/DimReduction";
import IsomapStrategy from "./StrategyDimReduction/alghorithms/IsomapStrategy";
import UmapStrategy from "./StrategyDimReduction/alghorithms/UmapStrategy";
import FastmapStrategy from "./StrategyDimReduction/alghorithms/FastmapStrategy";
import LLEStrategy from "./StrategyDimReduction/alghorithms/LLEStrategy";
import TsneStrategy from "./StrategyDimReduction/alghorithms/TsneStrategy";
import FastmapParameter from "./StrategyDimReduction/parameters/FastmapParameter";
import IsomapParameter from "./StrategyDimReduction/parameters/IsomapParameter";
import UmapParameter from "./StrategyDimReduction/parameters/UmapParameter";
import LLEParameter from "./StrategyDimReduction/parameters/LLEParameter";
import TsneParameter from "./StrategyDimReduction/parameters/TsneParameter";
import PcaStrategy from "./StrategyDimReduction/alghorithms/PcaStrategy";
import PcaParameter from "./StrategyDimReduction/parameters/PcaParameter";
import * as d3 from "d3";

export class DimensionalReductionVM{
	constructor(rootStore, closeModal){
		this.datasetStore = rootStore.datasetStore;
    	this._dimensionsToRedux = [];
		this.algorithmType = AlgorithmType.FastMap;
		this.newDimensionsName = AlgorithmType.FastMap;
		this.newDimensionsNumber = 2;
		this.neighbors = 30;
		this.localConnection = 5;
		this.minDistance = 0.5;
		this.perplexity = 30;
		this.epsilon = 10;
		this.nameError = false;
		this.closeModal = closeModal.bind(null);
		this.isLoading= false;
		this.showDanger = false;
		this.showSuccess = false;
		this.normalize = false;
		makeAutoObservable(this, {datasetStore: false}, {autoBind: true}); 
	}

	get optionList (){
		this.dimensionsToRedux=[];
		return this.datasetStore.numericDimensions.map(d => {return {value: d.value, label: d.value};});
	}
	get dimensionsToRedux(){
		if(this._dimensionsToRedux.length === 0){
			this.dimensionsToRedux = this.datasetStore.numericDimensions.map(d => {return {value: d.value, label: d.value};}).slice(0,2);
		}
		return this._dimensionsToRedux;
	}
	set dimensionsToRedux(value){
		this._dimensionsToRedux = value;
	}
    
    handleNormalize = () => {
    	this.normalize = !this.normalize;
    }

    normalizeData(data){
    	const maxes = this.dimensionsToRedux.map((dim,i) => {
    		return d3.max(data, obj => obj[i]);
    	});
    	return data.map(obj => this.dimensionsToRedux.map((dim, j) => obj[j] / maxes[j]));
    }

    setIsLoading(value){
    	this.isLoading = value;
    }

    setShowDanger = bool =>{
    	this.showDanger = bool;
    }
    setShowSuccess= bool =>{
    	this.showSuccess = bool;
    }

    handleSubmit = () => {
    	try{
    		let data = this.datasetStore.selectedData.map(obj => this.dimensionsToRedux.map((dim) => obj[dim.value]));

    		if(this.normalize){
    			data = this.normalizeData(data);
    			this.normalize = false;
    		}   

    		const parameters = {
    			Name: this.newDimensionsName,
    			DimensionsNumber: this.newDimensionsNumber,
    			Neighbors: this.neighbors,
    			Perplexity: this.perplexity,
    			Epsilon: this.epsilon,
    			LocalConnection: this.localConnection,
    			MinDistance: this.minDistance
    		};
		    
    		if(this.datasetStore.dimensions.some(dim => dim.value.slice(0, -1) === parameters.Name) || this.newDimensionsName ===""){
    			let e = new Error("The name is already in use. Please choose a different one.");
    			e.name = "nameError";
    			throw e;
    		}
		    const drStrategy = new DimReduction();
    		let params;
				
    		if(this.algorithmType === AlgorithmType.IsoMap) {
    			drStrategy.setStrategy(new IsomapStrategy());
    			params = new IsomapParameter(parameters);
    		}
    		if(this.algorithmType === AlgorithmType.FastMap) {
    			drStrategy.setStrategy(new FastmapStrategy());
    			params = new FastmapParameter(parameters);
    		}
    		if(this.algorithmType === AlgorithmType.PCA) {
    			drStrategy.setStrategy(new PcaStrategy());
    			params = new PcaParameter(parameters);
    		}
    		if(this.algorithmType === AlgorithmType.LLE) {
    			drStrategy.setStrategy(new LLEStrategy());
    			params = new LLEParameter(parameters);
    		}
    		if(this.algorithmType === AlgorithmType.tSNE) {
    			drStrategy.setStrategy(new TsneStrategy());
    			params = new TsneParameter(parameters);
    		}	
    		if(this.algorithmType === AlgorithmType.UMAP) {
    			drStrategy.setStrategy(new UmapStrategy());
    			params = new UmapParameter(parameters);
    		}	

    		const reduction = drStrategy.executeStrategy(params,data);
		
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
    		this.setShowSuccess(true);
    		this.closeModal();
    	}catch(e){
    		if(e.name === "nameError")
    		    this.nameError = true;
    		else{
    			this.setShowDanger(true);
    			this.closeModal();
    		}
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
		this.nameError = false;
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
	handleChangeLocalConnection = (e) =>{
		this.localConnection = e.target.value;
	}
	handleChangeMinDist = (e) =>{
		this.minDistance = e.target.value;
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