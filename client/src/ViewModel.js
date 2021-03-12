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
    */

}
export default ViewModel