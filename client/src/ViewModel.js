class ViewModel{

    constructor(_model){
        this.model = _model;
    }

    getDimensions(){
        return this.model.getDimensions();
    }

    /*
    reduceDimensions(algorithm) {
        //dimensioni o dati passati come parametro?
        const data = []; //dati ricavati dalle dimensioni interessate 

        const dimRedStrategy = new DimReductionStrategy();
      
        dimRedStrategy.setStrategy(algorithm);

        dimRedStrategy.executeStrategy(paramaters,data);
    }

        //{sepal_length: 4.9, sepal_width: 3, petal_length: 1.4, petal_width: 0.2, species: "setosa"}
    haveNotANumberValue(dataset) {
        
        const notNumber = value => isNaN(value);
        dataset.some( row => Object.values(row).some(notNumber) );

        let not_nan = true;
        data.forEach(dim => {
          if(isNaN(data[dim])){
            not_nan = false;
            //return; non c'è modo di fermare un forEach se non con una eccezione
          }
        }); 
        return not_nan;
    }   
    */

}
export default ViewModel