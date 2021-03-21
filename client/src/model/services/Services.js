import {api} from "./ApiURL"

export const getDatasetWithParams=async(columnSelected,table_name)=>{
	//console.log("columnSelected1 api: ",columnSelected,"table_name:",table_name)
	function getData(){
		return columnSelected.map((item, i) => {
			return item.value;
		});
	}
	try{
		const selectField=getData();
		const dataSet= await api.post("/get-data",{selectField,table_name});
		console.log("columnSelected api: ", dataSet.data)
		return dataSet.data
		//Data.push(dataSet.data);
	}catch(err){
		console.error(err.message);    
	 }
	 //console.log("Data api: ", Data)
	 //return A;
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
