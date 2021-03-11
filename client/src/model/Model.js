import { createContext } from 'react'
import { makeAutoObservable } from "mobx"

import Dimension from './Dimension';
import Dimensions from './Dimensions';

class Model {
    
    //tutte le strutture dati, quindi array per dimensioni, dati delle dimensioni, dimensioni selezionate, dimensioni ridotte, 

    dim = new Dimension;
    dims = new Dimensions;

    constructor(){
        makeAutoObservable(this)
    }

    //getters e setters vari, in modo da passare dati alla ModelView e caricare i dati nel Model dalla ModelView, 
    //tra cui anche dei setters per settare l'algoritmo di riduzione dimensionale e parametri annessi
    getDimensions(){
        return this.dims;
    }

    //metodi per la riduzione dimensionale per poi creare l'array con le dimensioni ridotte
    
    //creazione del file JSON per la sessione e download, i dati son passati dal viewModel e lo genera
    
    //caricamento dati da JSON della sessione, in modo che venga richiamato dal ViewModel per settare le strutture dati

    /*esempi:
            setData();
            getData();
            setAlgorithm();
            riduzioneDimensionale();
            getNumericDimension();
            getCategoricDimension();
            .....
    */
       
}

export default createContext(new Model())