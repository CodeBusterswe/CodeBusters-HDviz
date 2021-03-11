import Model from "./model/Model";

class ViewModel{

    model = new Model();

    constructor(model){
        this.model = model;
    }

    getDimensions(){
        return this.model.getDimensions();
    }

    //metodo per validazione del file CSV caricato
    
    //trasformazione del CSV e caricamento dei dati

    //settaggio dell'algoritmo di riduzione dimensionale e settaggi personalizzazioni varie
    
    //set/get del grafico di D3 scelto
    
    //caricamento nel model dei dati di un file JSON

    /*esempi:
                validateCSV();
                csvToData();
                
                loadData(){
                    validateCSV()
                    csvToData()
                    model.setData(); //carica i dati
                }

                setDimRedAlgorithm(){
                    model.setAlgorithm(); //imposta algoritmo di riduzione dimensionale
                }

                loadDataFromJSON(){
                    //comunica con il model e carica
                }

                getD3Graph();
                setD3Graph();
    */

}
export default ViewModel