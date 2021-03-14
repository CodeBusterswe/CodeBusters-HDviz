import AlgorithmInterface from "./../AlghorithmInterface"

class LLEStrategy extends AlgorithmInterface{
    
	//stessi campi dati di AlgorithmStrategy
	constructor() {
		super();
		this.result = null;
		this.matrix = null;
	}

	executeStrategy(paramaters,data) {/*
        const matrix = druid.Matrix.from(sendedData);
        const DR = druid[drAlgo]; //questo andrà tolto
        let redux = new DR(matrix, nNewDim, neighbors);
        return redux.transform();*/
	}
}

export default LLEStrategy;