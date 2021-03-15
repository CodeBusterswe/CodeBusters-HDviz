import Dimension from "./model/Dimension";
import Model from "./model/Model";
import { toJS } from "mobx"
import DimReductionStrategy from "./viewModel/DimReductionStrategy"
import { AlgorithmType } from "./utils" // <--- LASCIARE PLS

class ViewModel{

	constructor(){
		this.model = new Model();
	}
	
	getShowSPM(){
		return this.model.getShowSPM();
	}

	setShowSPM(){
		this.model.setShowSPM();
	}

	getDimensions(){
		return this.model.getDimensions();
	}

	getDimensionsChecked(){
		return this.model.getDimensions().filter(dim => dim._isChecked).map((d) => d.value);
	}

	getNotNumericChecked(){
		return this.model.getDimensions().filter(dim => !dim._isNumeric && dim._isChecked).map((d) => d.value);
	}

	getOriginalData(){
		return this.model.getOriginalData();
	}

	getOptionsForReduxDimensionsList(){
		return this.model.getNumericDimensions().map(d => {
			return {value: d.value, label: d.value}
		})
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
	}

	updateDims(dims){
		this.model.loadDimensions(dims);
		this.updateSelectedData()
	}

	haveNotANumberValue(datasetRow) {
		let notNan = true;
		for(const value of Object.values(datasetRow)) {
			if(isNaN(value))
				notNan = false;
		}
		return notNan;
	}

	updateSelectedData(){
		const checkedDims = this.model.getSelectedDimensions(),
			originalData = toJS(this.model.getOriginalData());
		//con filter tolgo i dati che hanno alcune dimensioni numeriche selezionate NaN; e con map prendo le dimensioni selezionate
    	let selectedData = originalData.map(d => {
        	return Object.fromEntries(checkedDims.map(dim => [dim.value, d[dim.value]]))
     	})//.filter(this.haveNotANumberValue);
		this.model.updateSelectedData(selectedData);
		 //log di test
		 console.log("original: ",toJS(this.model.getOriginalData()))
		 console.log("selected: ",toJS(this.model.getSelectedData()))
		 console.log("dimensions:", toJS(this.model.getDimensions()))
	}
    
	prepareDataForDR(dimensionsToRedux) {
		return this.getOriginalData().map(obj => dimensionsToRedux.map((dim) => obj[dim]));
	}
	beginDimensionalRedux(algorithm, dimensionsToRedux, paramaters){
		const newData = this.prepareDataForDR(dimensionsToRedux);
		this.reduceDimensions(algorithm, paramaters, newData);
	}
	reduceDimensions(algorithm, paramaters, data) {
		//spostare dove serve questo controllo
		let nameAlreadyUsed = this.model.getSelectedDimensions().some(dim => dim.getValue().includes(algorithm));
		if(nameAlreadyUsed)
			throw "The name is already in use. Please choose a different one."
		//*******************************************************************
		const drStrategy = new DimReductionStrategy();

		drStrategy.setStrategy(algorithm);
		drStrategy.setData(data);
		drStrategy.setParameters(paramaters);

		const reduction = drStrategy.executeStrategy();
		
		let newDimsFromReduction = [];
    	for (let i = 1; i <= reduction._cols; i++) {
			let d = new Dimension(paramaters.Name+i);
			d.isReduced(true);
      		newDimsFromReduction.push(d);
    	}

		let newDataFromReduction = this.model.getSelectedData(); //sostituire con data??				
		for(let i = 0; i<newDataFromReduction.length; i++){
			let d = newDataFromReduction[i];
			let j=0;
			newDimsFromReduction.forEach(dim => {
			  d[dim.getValue()] = reduction.to2dArray[i][j];
			  j++;
			});
		}

		this.model.addDimensionsToDataset(newDimsFromReduction,newDataFromReduction);
		console.log(this.model.getSelectedData);
	}
	 
}
export default ViewModel