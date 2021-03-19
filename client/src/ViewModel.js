import Dimension from "./model/Dimension";
import DistanceMatrix from "./model/DistanceMatrix";
import Model from "./model/Model";
import { toJS } from "mobx"
import DimReductionStrategy from "./viewModel/DimReductionStrategy"
import * as distCalc from "ml-distance";
import {getDataset, getTables,getDatasetByName,getColumnByName,getDatasetWithParams} from "./model/services"  
import Preferences from "./model/Preferences";

class ViewModel{

	constructor(){
		this.model = new Model();
		this.preferences = new Preferences();
	}
	
	//get all dataset from csv table
	async getAllDataset(){
		const dataset = await getDataset();
		//console.log("dataset:",dataset);
		return dataset;
	}	
	async getDatasetByParams(columnSelected,table){
		const dataset = await getDatasetWithParams(columnSelected,table);
		//console.log("dataset:",dataset);
		return dataset;
	}

	//get all dataset from csv table
	async getColumnsWithName(table_name){
		//console.log("model col:",table_name);
		const dataset = await getColumnByName(table_name);
		//console.log("dataset:",dataset);
		return dataset;
	}

	getDistanceMatrices(){
		return this.model.getDistanceMatrices();
	}

	async getColumnList(table_name){
		const dataset = await getColumnByName(table_name)
		console.log("dataset:",dataset);
		return dataset[0].map(d => {
			return {value: d.column_name, label: d.column_name}
		})
	}
	//get all dataset from csv table
	async getTableWithName(table_name){
		this.getColumnsWithName(table_name)
		const dataset = await getDatasetByName(table_name);
		//console.log("dataset:",dataset);
		return dataset.data;
	}
	getChartToShow(){
		return this.preferences.chart;
	}
	//get all tables from DB
	async getAllTables(){
		const table = await getTables();
		console.log("tables:",table.data);
		return table;
	}

	setChartToShow(chartName){
		this.preferences.chart = chartName;
	}
	getSpmPreferences(){
		return [this.preferences.SpmAxes, this.preferences.SpmColor]
	}
	getHmPreferences(){
		return Object.values(this.preferences.hmPreferences);
	}
	setHmPreferences(identifier, value){
		switch(identifier){
		case "xAxis":
			this.preferences.hmXaxis = value
			break;
		case "yAxis":
			this.preferences.hmYaxis = value
			break;
		case "heat":
			this.preferences.hmFill = value
			break;
		default:
			break;
		}
	}
	
	getSpmColor(){
		return this.preferences.SpmColor
	}
	setSpmAxis(identifier, value){
		if(identifier !== "color")
			this.preferences.setSPMAxis(identifier, value);
		else
			this.preferences.SpmColor = value
	}
	getDimensions(){
		return this.model.getDimensions();
	}

	getCheckedDimensions(){
		return this.model.getDimensions().filter(dim => dim._isChecked).map((d) => d.value);
	}

	getCategoricCheckedDimensions(){
		return this.model.getDimensions().filter(dim => !dim._isNumeric && dim._isChecked).map((d) => d.value);
	}
	isDataLoaded(){
		return this.model.isDataLoaded();
	}
	getOriginalData(){
		return this.model.getOriginalData();
	}
	getSelectedData(){
		return this.model.getSelectedData();
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
			if(val.data !== ""){ 
				let line = {};
				for (let i = 0; i < val.data.length; i++) { //for each value of the row
					switch(val.data[i]){
					case "":	//stringa vuota per dimensioni categoriche
						line[columns[i]] = undefined;
						break;
					case "NaN":	//NaN per dimensioni numeriche
						line[columns[i]] = NaN;
						break;
					default:
						line[columns[i]] = +val.data[i] ? +val.data[i] : val.data[i];
						break;
					}
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
		this.model.loadData(data);
		this.model.loadDimensions(dims);
		this.preferences.reset();	//resetto le preferenze per il grafico
		this.updateSelectedData();
	}

	updateDims(dims){
		this.model.loadDimensions(dims);
		this.preferences.reset();	//resetto le preferenze per il grafico
		this.updateSelectedData()
	}

	haveNotANumberValue(datasetRow) {
		return !Object.values(datasetRow).some(value => Number.isNaN(value) || value === undefined)
	}

	updateSelectedData(){
		//da fixare se si vuole che al cambiamento si aggiornino solo quelle ridotte
		const checkedDims = this.model.getSelectedDimensions(),
			originalData = toJS(this.model.getOriginalData());
		console.log(checkedDims)
		//con filter tolgo i dati che hanno alcune dimensioni numeriche selezionate NaN; e con map prendo le dimensioni selezionate
		let selectedData = originalData.map(d => {
			return Object.fromEntries(checkedDims.map(dim => [dim.value, d[dim.value]]))
	 	}).filter(this.haveNotANumberValue);
		//console.time("model.updateSelectedData")
		this.model.updateSelectedData(selectedData);
		//console.timeEnd("model.updateSelectedData")
		 //log di test
		 //console.log("original: ",toJS(this.model.getOriginalData()))
		 //console.log("selected: ",toJS(this.model.getSelectedData()))
		 //console.log("dimensions:", toJS(this.model.getDimensions()))
		 
		 //prova della riduzione tramite distanze
		 //this.reduceDimensionsByDist("euclidean", originalData, "name", "age");
	}
	
	prepareDataForDR(dimensionsToRedux) {
		return this.getSelectedData().map(obj => dimensionsToRedux.map((dim) => obj[dim]));
	}

	beginDimensionalRedux(algorithm, dimensionsToRedux, paramaters){
		const newData = this.prepareDataForDR(dimensionsToRedux);
		this.reduceDimensions(algorithm, paramaters, newData);
	}

	beginReduceDimensionsByDist(distType, dimensionsToRedux, matrixName){
		//console.log(distType, dimensionsToRedux, matrixName);

		const newData = this.prepareDataForDR(dimensionsToRedux);
		this.reduceDimensionsByDist(distType, newData, matrixName);
	}

	reduceDimensionsByDist(distType, data, matrixName) {
		//data = [ [5.1, 3.5], [4.9, 3], [4.7, 3.2] ]
		//console.log(this.getSelectedData())
		let matrix = new DistanceMatrix();

		for (let i = 0; i < data.length; i++) {
			for (let j = i+1; j < data.length; j++) {
				let link = {
					source : `node${i}`,
					target : `node${j}`,
					value: distCalc.distance[distType](data[i], data[j])
				};
				matrix.pushLink(link);
			}
			let node = this.getSelectedData()[i];
			matrix.pushNode(node);
		}
		//console.log(matrix.getLinks());
		//console.log(matrix.getNodes());
		this.model.addDistanceMatrix(matrix,matrixName);
	}

	async reduceDimensions(algorithm, paramaters, data) {
		
		//spostare dove serve questo controllo
		try{
			let nameAlreadyUsed = this.model.getDimensions().some(dim => dim.getValue().includes(paramaters.Name));
			if(nameAlreadyUsed)
			  throw new Error("The name is already in use. Please choose a different one.")
		  }catch(e){
			console.log(e);
		  }
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

		this.model.addDimensionsToDataset(newDimsFromReduction);
	}
	 
}
export default ViewModel;