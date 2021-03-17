import Dimension from "./model/Dimension";
import DistanceMatrix from "./model/DistanceMatrix";
import Model from "./model/Model";
import { toJS } from "mobx"
import DimReductionStrategy from "./viewModel/DimReductionStrategy"
import { AlgorithmType } from "./utils" // <--- LASCIARE PLS
import * as distCalc from "ml-distance";
import {getDataset} from "./model/services"  

class ViewModel{

	constructor(){
		this.model = new Model();
	}
	
	//get all data set from csv table
	async getAllDataset(){
		const dataset = await getDataset();
		console.log("dataset:",dataset);
		return dataset;
	}
	getChartToShow(){
		return this.model.getChartToShow();
	}

	setChartToShow(chartName){
		this.model.setChartToShow(chartName);
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
		console.time("model.loadData")
		this.model.loadData(data);
		console.timeEnd("model.loadData")
		this.model.loadDimensions(dims);
		this.updateSelectedData();
	}

	updateDims(dims){
		console.time("model.loadDimensions");
		this.model.loadDimensions(dims);
		console.timeEnd("model.loadDimensions");
		this.updateSelectedData()
	}

	haveNotANumberValue(datasetRow) {
		return !Object.values(datasetRow).some(value => Number.isNaN(value) || value === undefined)
	}

	updateSelectedData(){
		const checkedDims = this.model.getSelectedDimensions(),
			originalData = toJS(this.model.getOriginalData());
		//con filter tolgo i dati che hanno alcune dimensioni numeriche selezionate NaN; e con map prendo le dimensioni selezionate
		let selectedData = originalData.map(d => {
			return Object.fromEntries(checkedDims.map(dim => [dim.value, d[dim.value]]))
	 	}).filter(this.haveNotANumberValue);
		console.time("model.updateSelectedData")
		this.model.updateSelectedData(selectedData);
		console.timeEnd("model.updateSelectedData")
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

	reduceDimensionsByDist(distType, data, idDimension, groupDimension) {
		//data = [ {}, {nome: "Paolo", peso: 50, altezza: 180}, ...., {} ]
		//idDimension = "nome"
		let matrix = new DistanceMatrix();

		for (let i = 0; i < data.length - 1; i++) {
			for (let j = i+1; j < data.length - 1; j++) {
				let pointA = Object.values(data[i]),
					pointB = Object.values(data[j]);
				pointA.shift();
				pointB.shift();
				let link = {
					source: data[i][idDimension],
					target: data[j][idDimension],
					value: distCalc.distance[distType](pointA, pointB)
				}
				matrix.pushLink(link);
			}
			let node = {
				id: data[i][idDimension],
				group: data[i][groupDimension]
			}
			matrix.pushNode(node);
		}
		//console.log(matrix.getLinks());
		//console.log(matrix.getNodes());
		this.model.pushDistanceMatrix(matrix);
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
		//console.log(newDataFromReduction)
		console.log(this.model.getSelectedData());
	}
	 
}
export default ViewModel