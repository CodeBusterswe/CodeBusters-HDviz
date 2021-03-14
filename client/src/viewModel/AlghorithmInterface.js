/*
interfaccia che rappresenta la strategia astratta. Essa denisce il contratto che un 
componente che processa i dati per un determinato algoritmo deve avere per essere tale.
*/
class AlgorithmInterface {
    
    //campi dati
    result = null;
    matrix = null;

    constructor() {
    	if (this.constructor === AlgorithmInterface) {
    		throw new TypeError("Abstract classes can't be instantiated.");
    	}
    }

    executeStrategy() {
    	throw new TypeError(
    		"Method 'executeStrategy()' must be implemented."
    	);
    }

	//stessa cosa per altre funzioni
}

export default AlgorithmInterface;