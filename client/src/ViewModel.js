import Dimension from "./model/Dimension";
import Model from "./model/Model";
import { toJS } from "mobx"
import DimReductionStrategy from "./viewModel/DimReductionStrategy"
import * as druid from "@saehrimnir/druidjs";
class ViewModel{

	constructor(){
		this.model = new Model();
	}
	
	getDimensions(){
		return this.model.getDimensions();
	}
	getOriginalData(){
		return this.model.getOriginalData();
	}

	parseAndLoadCsvData(data) {
		let columns = data.shift().data, 
			parsedData = [],
			dimensions;
        
		data.forEach(val =>{ //for each row
			let line = {};
			if(val.data !== ""){ 
				for (let i = 0; i < val.data.length; i++) { //for each value of the row
					if(val.data[i] === "") //check empty values
						line[columns[i]] = "undefined";     
					else
						line[columns[i]] = +val.data[i] ? +val.data[i] : val.data[i]; //numeric value or string 
				}
				parsedData.push(line);  
			}
		});
        
		dimensions = columns.map(dimName => {
			let d = new Dimension(dimName);
			d.isNumeric(+parsedData[0][dimName] ? true : false)
			return d;
		});                                           

		return [parsedData, dimensions];
	}
	loadDataAndDims(data, dims){
		this.model.loadData(dims, data)
		this.updateSelectedData()
	}
	updateDims(dims){
		this.model.loadDimensions(dims);
		this.updateSelectedData()
	}
	haveNotANumberValue(dataset) {
		//const notNumber = value => isNaN(value);
		//dataset.some( row => Object.values(row).some(notNumber) );

		let not_nan = true;
		dataset.forEach(dim => {
			if(isNaN(dataset[dim])){
				not_nan = false;
				//return; non c'è modo di fermare un forEach se non con una eccezione
			}
		}); 
		return not_nan;
	}  
	updateSelectedData(){
		const checkedDims = this.model.getSelectedDimensions()
		//con filter tolgo i dati che hanno alcune dimensioni numeriche selezionate NaN; e con map prendo le dimensioni selezionate
    	let selectedData = toJS(this.model.getOriginalData()).map(d => {
        	return Object.fromEntries(checkedDims.map(dim => [dim.value, d[dim.value]]))
     	})//.filter(this.haveNotANumberValue);
		this.model.updateSelectedData(selectedData);
		 //log di test
		 console.log("original: ",toJS(this.model.getOriginalData()))
		 console.log("selected: ",toJS(this.model.getSelectedData()))
		 console.log(toJS(this.model.getDimensions()))

	}
    
	reduceDimensions(algorithm) {
		//dimensioni o dati passati come parametro?
		// const data = []; //dati ricavati dalle dimensioni interessate 

		const dimRedStrategy = new DimReductionStrategy();
        
		// dimRedStrategy.setStrategy(algorithm);

		// dimRedStrategy.executeStrategy(paramaters,data);
	}

	//{sepal_length: 4.9, sepal_width: 3, petal_length: 1.4, petal_width: 0.2, species: "setosa"}
	 
}
export default ViewModel