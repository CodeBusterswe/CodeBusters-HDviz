import { AlgorithmType } from "./../utils";
import IsomapStrategy from "./alghorithms/IsomapStrategy";
import FastmapStrategy from "./alghorithms/FastmapStrategy";
import LLEStrategy from "./alghorithms/LLEStrategy";
import TsneStrategy from "./alghorithms/TsneStrategy";

/*
classe concreta che rappresenta il context e al suo interno viene scelto, sulla base dei dati 
e della richieste ricevute, quale strategia seguire, che in questo caso è rappresentata da
quale algoritmo di riduzione dimensionale usare
*/

class DimReductionStrategy {
    
	constructor() {
    	this.strategy = null;
    	this.parameters = null;
    	this.data = null;
	}

	setStrategy(algorithm) {
    	if(algorithm === AlgorithmType.IsoMap) {
    		this.strategy = new IsomapStrategy();
    	}
    	if(algorithm === AlgorithmType.FastMap) {
    		this.strategy = new FastmapStrategy();
    	}
    	if(algorithm === AlgorithmType.LLE) {
    		this.strategy = new LLEStrategy();
    	}
    	if(algorithm === AlgorithmType.tSNE) {
    		this.strategy = new TsneStrategy();
    	}
	}

	setParameters(parameters) {
    	this.parameters = parameters;
	}

	setData(data) {
    	this.data = data;
	}

	getStrategy() {
    	return this.strategy;
	}

	getParams() {
    	return this.parameters;
	}

	getData() {
    	return this.data;
	}

	executeStrategy() {
    	return this.strategy.startDR(this.parameters, this.data);
	}
}

export default DimReductionStrategy;