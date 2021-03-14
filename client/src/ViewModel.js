import Dimension from "./model/Dimension";
import Model from "./model/Model";
import { toJS } from "mobx"
import DimReductionStrategy from "./viewModel/DimReductionStrategy"
import { AlgorithmType } from "./utils" // <--- LASCIARE PLS

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
		this.model.loadData(dims, data);
		this.updateSelectedData();

		//per provare riduzione dimensionale
		/*
		const paramaters = {
			Name: "Prova",
			DimensionsNumber: 2,
			Neighbors: 20,
			Perplexity: 40,
			Epsilon: 10
		}
		this.reduceDimensions(AlgorithmType.tSNE, paramaters, data);
		*/
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
    
	prepareDataForDR(data) {
		//filter con dimensioni numeriche??
		return data.map(obj => Object.values(obj));
	}

	reduceDimensions(algorithm, paramaters, data) {

		//spostare dove serve questo controllo
		let nameAlreadyUsed = this.model.getSelectedDimensions().some(dim => dim.getValue().includes(algorithm));
		if(nameAlreadyUsed)
			throw "The name is already in use. Please choose a different one."
		//*******************************************************************
		const drStrategy = new DimReductionStrategy();
		const newData = this.prepareDataForDR(data);

		drStrategy.setStrategy(algorithm);
		drStrategy.setData(newData);
		drStrategy.setParameters(paramaters);

		const reduction = drStrategy.executeStrategy();
		
		let newDimsFromReduction = [];
    	for (let i = 1; i <= reduction._cols; i++) {
			let d = new Dimension(paramaters.Name+i);
			d.isReduced(true);
      		newDimsFromReduction.push(d);
    	}

		let newDataFromReduction = this.model.getSelectedData();				
		for(let i = 0; i<newDataFromReduction.length; i++){
			let d = newDataFromReduction[i];
			let j=0;
			newDimsFromReduction.forEach(dim => {
			  d[dim.getValue()] = reduction.to2dArray[i][j];
			  j++;
			});
		}

		this.model.addDimensionsToDataset(newDimsFromReduction,newDataFromReduction);
	}
	 
}
export default ViewModel