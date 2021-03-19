import {api} from "./ApiURL"

export const getDatasetWithParams=async(columnSelected,table_name)=>{
	console.log("columnSelected1 api: ",columnSelected,"table_name:",table_name)
	const Data=[];
	function getData(){
		return columnSelected.map((item, i) => {
			return item.value;
		});
	}
	const data=columnSelected;
	var getFormDefinition = function(arr) {
		function getSchemaObj(arr) {
			return arr.map(item => ({
				[item.value]:item.value
				
			})).reduce((a, b) => ({ ...a, ...b }))
		}

		var schemaObj = getSchemaObj(arr)

		arr.push = function(...item) {
			Object.assign(schemaObj, getSchemaObj(item))

			return Array.prototype.push.call(arr, ...item)
		}
		return schemaObj;
	}

	//var typeArray = ["name", "strret", "car", "type"];
	var result = getFormDefinition(data)
	console.log("result:",result)

	//data.push("nitish")
	console.log(result)

	const sliceData=[]
	sliceData.push(result);
	function getSlicedData(){
		return sliceData.slice().map((data, i) => {
			return data;
		  });
	  }
	console.log("columnSelected api: ",getData(),"getSlicedData:",getSlicedData())
	try{
		const selectField=getData();
		const dataSet= await api.post("/get-data",{selectField,table_name});
		//console.log("dataSet api: ", dataSet.data)
		Data.push(dataSet.data);
	}catch(err){
		console.error(err.message);    
	 }
	 //console.log("Data api: ", Data)
	 return {data:Data};
}

export const getDataset=async()=>{
	const table="dataset"
	const Data=[];
	//console.log("Data api: ", Data)
	try{
		const dataSet= await api.post("/get-tabel-byName",{table:table});
		//console.log("dataSet api: ", dataSet.data)
		Data.push(dataSet.data);
	}catch(err){
		console.error(err.message);    
	 }
	 //console.log("Data api: ", Data)
	 return {data:Data};
}

export const getTables=async()=>{
	const table="dataset"
	const tables=[];
	//console.log("tables api: ", tables)
	try{
		const table= await api.get("/get-tables");
		console.log("tables api: ", )
		tables.push(table.data);
	}catch(err){
		console.error(err.message);    
	 }
	 //console.log("Data api: ", Data)
	 return tables;
}
export const getDatasetByName=async(table_name)=>{
	console.log("table_name service:",table_name)
	const tables=[];
	//console.log("tables api: ", tables)
	try{
		const table= await api.post("/get-tabel-byName",{table:table_name});
		//console.log("getDatasetByName api: ", table.data)
		tables.push(table.data);
	}catch(err){
		console.error(err.message);    
	 }
	 //console.log("Data api: ", Data)
	 return tables;
}

export const getColumnByName=async(table_name)=>{
	console.log("table_name service:",table_name)
	const tables=[];
	//console.log("tables api: ", tables)
	try{
		const table= await api.post("/get-columns",{table:table_name});
		//console.log("getDatasetByName api: ", table.data)
		tables.push(table.data);
	}catch(err){
		console.error(err.message);    
	 }
	 //console.log("Data api: ", Data)
	 return tables;
}
