import { action, makeAutoObservable } from "mobx";
import {getTables, getColumnsByName, getDatasetWithParams, getDatasetWithCustomParams} from "./services";
import Dimension from "../../../../stores/data/Dimension";
export class LoadDataFromDBVM{
	constructor(rootStore, closeModal){
		this.datasetStore = rootStore.datasetStore;
    	this.distanceMatricesStore = rootStore.distanceMatricesStore;
    	this.preferencesStore = rootStore.preferencesStore;
		this.localData = [];
		this.localDimensions = [];
		this._tables = null;
		this._columns = [];
		this._table = "undefined";
		this.selectedColumns = [];
		this.conditionColumn = "undefined";
		this.conditionValue = "";
		this.conditionSign = "undefined";
		this.clicked = false;
		this._empty = false;
		this._resultLength = 0;
		this.showDanger = false;
		this.showSuccess = false;
		this.closeModal = closeModal.bind(null);
		makeAutoObservable(this, {
			datasetStore: false, 
			preferencesStore: false,
			distanceMatricesStore: false,
			setShowDanger: action.bound, 
			setShowSuccess: action.bound,
			onSubmit: action.bound,
			getColumns: action.bound,
			getTables: action.bound,
		}, {autoBind: true}); 
	}
	get columns(){
		return this._columns;
	}
	set columns(value){
		this._columns = value;
	}
	get table(){
		return this._table;
	}
	set table(value){
		this._table = value;
	}
	get tables(){
		return this._tables;
	}
	set tables(value){
		this._tables = value;
	}
	get empty(){
		return this._empty;
	}
	set empty(value){
		this._empty = value;
	}
	get resultLength(){
		return this._resultLength;
	}
	set resultLength(value){
		this._resultLength = value;
	}
	async getQueryResult(){
		let data;
		if(this.conditionValue!=="" && this.conditionSign!=="undefined" && this.conditionColumn!=="undefined"){
			data = await getDatasetWithCustomParams(this.selectedColumns, this.conditionSign, this.conditionColumn, this.conditionValue, this.table);
		}else{
			data = await getDatasetWithParams(this.selectedColumns, this.table);
		}
	   return data.data;
	}

	async onSubmit(){
		this.clicked = true;
		const parsedData=await this.getQueryResult();
		if(parsedData && parsedData.length>0){
			this.empty = false;
			this.resultLength = parsedData.length;
			const dimensions = this.prepareDimensions(this.selectedColumns.map(c=>c.value), this.columns);
			this.localData = parsedData;
			this.localDimensions = dimensions;
		}else{
			this.localData = [];
			this.localDimensions = [];
			this.empty = true;
			this.resultLength = 0;
		}
	}
	prepareDimensions(selectedColumns, allColumns) {
		let dimensions = selectedColumns.map(name => {
			let d = new Dimension(name);
			allColumns.forEach(c => {
				if(c.value === name){//vado solo a cercare quelle non numeriche, di default é true
					if(c.type === "character varying"){
						d.isNumeric = false;
					}else{
						d.isNumeric = true;
					}
				}
			});
			return d;
		}); 
		return dimensions;
	}
	async getColumns(){
		try{
			const columns=await getColumnsByName(this.table);
			this.columns = columns.map(c => {
				return {value: c.column_name, label: c.column_name, type: c.data_type};
			});
		}catch(e){
			console.log("Nessuna colonna trovata");
			return;
		}
	}
	async getTables(){
		const tables=await getTables();
		try{
			this.tables = tables.map(d => d.table_name);
			this.table = tables.map(d => d.table_name)[0];
		}catch(e){
			console.log("Nessuna tabella trovata");
			return;
		}
	}

    handleChangeColumns = (value, handler) =>{
    	if(handler.action === "clear")
    		this.selectedColumns = [];
    	else 
    		this.selectedColumns = value;
    }
	
    handleSelectTable = e =>{
    	const tableName = e.target.value;
    	this.table = tableName;
    	this.selectedColumns = [];
    	this.localData = [];
    	this.localDimensions = [];
    	this.conditionColumn = "undefined";
    	this.conditionSign = "undefined";
    	this.conditionValue = "";
    	this.clicked = false;
    	this.resultLength = 0;
    }
    handleSelectConditionColumn = e =>{
    	const columnName = e.target.value;
    	this.conditionColumn = columnName;
    }
    handleSelectConditionValue = e =>{
    	const conditionValue = e.target.value;
    	this.conditionValue = conditionValue;
    }
    handleSelectConditionSign = e =>{
    	const conditionSign = e.target.value;
    	this.conditionSign = conditionSign;
    }
    loadDataAndDims(){
    	if(this.localData.length>0){
    		this.datasetStore.reset();
    		this.distanceMatricesStore.reset();
    		this.preferencesStore.reset();
    		this.datasetStore.loadData([...this.localData]);
    		this.datasetStore.loadDimensions([...this.localDimensions]);
    		this.datasetStore.updateSelectedData();
    	}
    }

    resetAndClose(){
    	this.selectedColumns = [];
    	this.localData = [];
    	this.localDimensions = [];
    	this.conditionColumn = "undefined";
    	this.conditionSign = "undefined";
    	this.conditionValue = "";
    	this.clicked = false;
    	this.resultLength = 0;
    	this.closeModal();
    }

    openAlertSuccess(){
    	return this.resultLength!==0 ?
    		this.showSuccess = true :
    		this.showDanger = true;
    }
    openAlertDanger(){
    	this.setShowDanger(true);
    }
    setShowDanger = bool =>{
    	this.showDanger = bool;
    }
    setShowSuccess= bool =>{
    	this.showSuccess = bool;
    }
    handleConfirm=()=>{
    	this.loadDataAndDims();
    	this.openAlertSuccess();
    	this.resetAndClose();    	
    }
	handleDismiss=()=>{
		this.resetAndClose();
		this.openAlertDanger();
	}

}