import { AlgorithmType } from "../utils";
import IsomapStrategy from "./alghorithms/IsomapStrategy";
import FastmapStrategy from "./alghorithms/FastmapStrategy";
import LLEStrategy from "./alghorithms/LLEStrategy";
import TsneStrategy from "./alghorithms/TsneStrategy";

class DimReduction {
    
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

export default DimReduction;