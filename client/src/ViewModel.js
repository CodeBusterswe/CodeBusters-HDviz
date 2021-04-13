import Dimension from "./model/Dimension";
import DistanceMatrix from "./model/DistanceMatrix";
import Model from "./model/Model";
import DimReduction from "./viewModel/DimReduction";
import * as distCalc from "ml-distance";
import {getTables, getColumnsByName, getDatasetWithParams, getDatasetWithCustomParams} from "./model/services";
import Preferences from "./model/Preferences";
import DistanceMatricesModel from "./model/DistanceMatricesModel";
//import kmeans from "ml-kmeans";

class ViewModel{
	#model;
	#preferences;
	#distanceMatricesModel;
	constructor(){
		this.#model = new Model(true);
		this.#preferences = new Preferences();
		this.#distanceMatricesModel = new DistanceMatricesModel();
	}

	/*get all dataset from csv table - Not used
	async getAllDataset(){
		const dataset = await getDataset();
		//console.log("dataset:",dataset);
		return dataset;
	}*/	
	/*get all dataset from csv table NOT USED
	async getTableWithName(table_name){
		const dataset = await getDatasetByName(table_name);
		//console.log("dataset:",dataset);
		return dataset.data;
	}*/
	//restituisce i valori dei dati nelle colonne selezionate della tabella scelta
	async getDatasetByParams(columnSelected,table){
		const dataset = await getDatasetWithParams(columnSelected,table);
		//console.log("ViewModel dataset:",dataset);
		return dataset;
	}
	//restituisce i valori dei dati nelle colonne selezionate della tabella scelta con condizione di where
	async getDatasetByCustomParams(selectedColumns, conditionSign, conditionColumn, conditionValue, table){
		const dataset = await getDatasetWithCustomParams(selectedColumns, conditionSign, conditionColumn, conditionValue, table);
		//console.log("ViewModel dataset:",dataset);
		return dataset;
	}
	
	//Ritorna le colonne di una tabella
	async getColumnList(table_name){
		const columns = await getColumnsByName(table_name);
		return columns.map(c => {
			return {value: c.column_name, label: c.column_name, type: c.data_type};
		});
	}
	
	//ritorna tutte le tabelle presenti nel database
	async getAllTables(){
		const table = await getTables();
		return table;
	}

	getDistanceMatricesByName(matrixName){
		return this.#distanceMatricesModel.getDistanceMatricesByName(matrixName);
	}
	getDistanceMatrices(){
		return this.#distanceMatricesModel.distanceMatrices;
	}

	getChartToShow(){
		return this.#preferences.chart;
	}
	getSpmPreferences(){
		return [this.#preferences.SpmAxes, this.#preferences.SpmColor];
	}
	getSpmColor(){
		return this.#preferences.SpmColor;
	}
	getHmPreferences(){
		return Object.values(this.#preferences.hmPreferences);
	}
	getAmPreferences(){
		return Object.values(this.#preferences.amPreferences);
	}
	getFfPreferences(){
		return Object.values(this.#preferences.ffPreferences);
	}
	getPlmaPreferences(){
		return Object.values(this.#preferences.plmaPreferences);
	}

	setChartToShow(chartName){
		this.#preferences.chart = chartName;
	}
	setSpmAxis(identifier, value){
		if(identifier !== "color")
			this.#preferences.setSPMAxis(identifier, value);
		else
			this.#preferences.SpmColor = value;
	}
	setHmPreferences(identifier, value){
		switch(identifier){
		case "xAxis":
			this.#preferences.hmXaxis = value;
			break;
		case "yAxis":
			this.#preferences.hmYaxis = value;
			break;
		case "heat":
			this.#preferences.hmFill = value;
			break;
		default:
		}
	}
	setAmPreferences(identifier, value){
		switch(identifier){
		case "distanceMatrix":
			this.#preferences.amDistanceMatrix = value;
			break;
		case "orderBy":
			this.#preferences.amOrderBy = value;
			break;
		case "label":
			this.#preferences.amLabel = value;
			break;
		case "distMax":
			this.#preferences.amDistMax = value;
			break;
		case "distMin":
			this.#preferences.amDistMin = value;
			break;
		default:
		}
	}
	setFfPreferences(identifier, value){
		switch(identifier){
		case "distanceMatrix":
			this.#preferences.ffDistanceMatrix = value;
			break;
		case "color":
			this.#preferences.ffColor = value;
			break;
		case "distMax":
			this.#preferences.ffDistMax = value;
			break;
		case "distMin":
			this.#preferences.ffDistMin = value;
			break;
		default:
		}
	}
	setPlmaPreferences(identifier, value){
		switch(identifier){
		case "dimensions":
			this.#preferences.plmaDimensions = value;
			break;
		case "color":
			this.#preferences.plmaColor = value;
			break;
		default:
		}
	}
	
	getDimensions(){
		return this.#model.allDimensions;
	}

	getCheckedDimensions(){
		return this.#model.checkedDimensions.map((d) => d.value);
	}

	getCategoricCheckedDimensions(){
		return this.#model.categoricCheckedDimensions.map((d) => d.value);
	}
	isDataLoaded(){
		return this.#model.isDataLoaded();
	}
	getOriginalData(){
		return this.#model.originalData;
	}
	getSelectedData(){
		return this.#model.selectedData;
	}

	getOptionsForReduxDimensionsList(){
		return this.#model.numericDimensions.map(d => {
			return {value: d.value, label: d.value};
		});
	}
	getDistanceMatricesNames(){
		return this.#distanceMatricesModel.distanceMatricesNames;
	}

	prepareDimensions(selectedColumns, allColumns) {
		let dimensions = selectedColumns.map(name => {
			let d = new Dimension(name);
			allColumns.forEach(c => {
				if(c.value === name){//vado solo a cercare quelle non numeriche, di default é true
					switch (c.type) {
					case "character varying":
						d.isNumeric = false;
						break;
					default:
						d.isNumeric = true;
						break;
					}
				}
			});
			return d;
		}); 
		return dimensions;
	}

	loadDataAndDims(data, dims){
		this.#model.reset();
		this.#distanceMatricesModel.reset();
		this.#model.loadData(data);
		this.#model.loadDimensions(dims);
		this.#preferences.reset();	//resetto le preferenze per il grafico
		this.updateSelectedData();
	}

	updateDims(dims){
		this.#model.loadDimensions(dims);
		this.#preferences.reset();	//resetto le preferenze per il grafico
		this.updateSelectedData();
	}

	haveNotANumberValue(datasetRow) {
		return !Object.values(datasetRow).some(value => Number.isNaN(value) || value === undefined || value===null);
	}

	updateSelectedData(){
		//da fixare se si vuole che al cambiamento si aggiornino solo quelle ridotte
		const checkedDims = this.#model.selectedDimensions,
			originalData = this.#model.originalData;
		//con filter tolgo i dati che hanno alcune dimensioni numeriche selezionate NaN; e con map prendo le dimensioni selezionate
		let selectedData = originalData.map(d => {
			return Object.fromEntries(checkedDims.map(dim => [dim.value, d[dim.value]]));
	 	}).filter(this.haveNotANumberValue);
		this.#model.loadDimensions(this.#model.notReducedDimensions);
		this.#model.updateSelectedData(selectedData);
		/*log di test
		 console.log("original: ",this.#model.originalData);
		 console.log("selected: ",this.#model.selectedData);
		 console.log("dimensions:", this.#model.allDimensions);
		 let string = ""; 
		 this.#model.originalData.forEach(line => {
			 let temp = "{"
			 for (const [key, value] of Object.entries(line)) {
				if(key !== "species")
					temp = temp.concat(key+ " : " + value+", ");
				else
					temp = temp.concat(key+ " : " + "\""+value+"\"");
			  }
			  string = string.concat(temp, "},");
			 })
		console.log(string);
		*/ 
	}
	
	beginDimensionalRedux(algorithm, dimensionsToRedux, paramaters){
		const newData = this.#model.selectedData.map(obj => dimensionsToRedux.map((dim) => obj[dim]));
		this.reduceDimensions(algorithm, paramaters, newData);
	}

	beginReduceDimensionsByDist(distType, dimensionsToRedux, matrixName){
		const newData = this.#model.selectedData.map(obj => dimensionsToRedux.map((dim) => obj[dim]));
		this.reduceDimensionsByDist(distType, newData, matrixName);
	}

	reduceDimensionsByDist(distType, data, matrixName) {
		//let numericDims = this.#model.numericDimensions;
		//	numericData = this.#model.selectedData.map(row => Array.from(numericDims.map(dim => row[dim.value])));
		
		//let prodotto = kmeans(numericData, 3, {distanceFunction: distCalc.distance[distType]});
		if(this.#distanceMatricesModel.getDistanceMatricesByName(matrixName))
			throw new Error("The name is already in use. Please choose a different one.");
		let matrix = new DistanceMatrix();
		//console.log(prodotto);
		matrix.name = matrixName;
		for (let i = 0; i < data.length; i++) {
			for (let j = i+1; j < data.length; j++) {
				let link = {
					source : "node"+i,
					target : "node"+j,
					value: distCalc.distance[distType](data[i], data[j])
				};
				matrix.pushLink(link);
			}
			let node = {...this.#model.selectedData[i]};
			node.id="node"+i;
			//node.group = prodotto.clusters[i];
			matrix.pushNode(node);
		}	
		this.#distanceMatricesModel.addDistanceMatrix(matrix,matrixName);
	}

	reduceDimensions(algorithm, paramaters, data) {
		let nameAlreadyUsed = this.#model.allDimensions.some(dim => dim.value.slice(0, -1) === paramaters.Name);
		if(nameAlreadyUsed)
			throw new Error("The name is already in use. Please choose a different one.");
		//*******************************************************************
		const drStrategy = new DimReduction();

		drStrategy.setStrategy(algorithm);
		drStrategy.setData(data);
		drStrategy.setParameters(paramaters);

		const reduction = drStrategy.executeStrategy();
		
		let newDimsFromReduction = [];
		for (let i = 1; i <= reduction._cols; i++) {
			let d = new Dimension(paramaters.Name+i);
			d.isReduced = true;
	  		newDimsFromReduction.push(d);
		}

		let newDataFromReduction = this.#model.selectedData;				
		for(let i = 0; i<newDataFromReduction.length; i++){
			let d = newDataFromReduction[i];
			let j=0;
			newDimsFromReduction.forEach(dim => {
			  d[dim.value] = reduction.to2dArray[i][j];
			  j++;
			});
		}
		this.#model.addDimensionsToDataset(newDimsFromReduction);
	}
	 
}
export default ViewModel;