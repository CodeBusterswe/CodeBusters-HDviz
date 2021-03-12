import { AlgorithmType } from './../utils'
import IsomapStrategy from './alghorithms/IsomapStrategy'
import FastmapStrategy from './alghorithms/FastmapStrategy'
import LLEStrategy from './alghorithms/LLEStrategy'
import TsneStrategy from './alghorithms/TsneStrategy'

/*
classe concreta che rappresenta il context e al suo interno viene scelto, sulla base dei dati 
e della richieste ricevute, quale strategia seguire, che in questo caso è rappresentata da
quale algoritmo di riduzione dimensionale usare
*/

class DimReductionStrategy {
    strategy;
    parameters;
    data;
    
    constructor() {
        this._strategy = null;
        this._parameters = null;
        this._data = null;
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
        this._parameters = parameters;
    }

    setData(data) {
        this._data = data;
    }

    getStrategy() {
        return this._strategy;
    }

    getParams() {
        return this._params;
    }

    getData() {
        return this._data;
    }

    executeStrategy() {
        return this._strategy.dimRed(this._parameters, this._data);
    }
}

export default DimReductionStrategy;