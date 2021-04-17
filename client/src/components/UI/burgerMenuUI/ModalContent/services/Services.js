import {api} from "./ApiURL";
import axios from "axios";
//restituisce il valore delle colonne selezionate
export const getDatasetWithParams=async(selectedColumns,table)=>{
	try{
		const selectField=selectedColumns.map(item => item.value);
		const dataSet= await axios.post("/get-data",{selectField, table});
		//return dataSet.data;
		return dataSet;
	}catch(err){
		console.error(err.message);    
	 }
};

// ritorna il valore della query personalizzata
export const getDatasetWithCustomParams=async(selectedColumns, conditionSign, conditionColumn, conditionValue, table)=>{
	let params = {conditionSign, conditionColumn, conditionValue, table};
	try{
		const selectField=selectedColumns.map(item => item.value);
		const dataSet= await axios.post("/get-custom-data",{selectField, params});
		//return dataSet.data;
		return dataSet;
	}catch(err){
		console.error(err.message);    
	 }
};

//ritorna tutte le tabelle presenti nel database
export const getTables=async()=>{
	try{
		const table= await axios.get("/get-tables");
		return table;
		//return {table:table.data,status:table.status};
	}catch(err){
		console.error(err.message);    
	}
};
//Ritorna le colonne di una tabella
export const getColumnsByName=async(table_name)=>{
	try{
		const columns = await axios.post("/get-columns",{table:table_name});
		return columns;
		//return {columns:columns.data,status:columns.status};
	}catch(err){
		console.error(err.message);    
	 }
};

//for testing 
export const serverTest=async()=>{
	try{
		const response= await api.get("/test-server");
		return response.data;
	}catch(err){
		console.error(err.message);   
	}
};

/* ritirna i dataset presenti nel database NOT USED
export const getDataset=async()=>{
	const table="dataset";
	const Data=[];
	//console.log("Data api: ", Data)
	try{
		const dataSet= await api.post("/get-tabel-byName",{table:table});
		Data.push(dataSet.data);
	}catch(err){
		console.error(err.message);    
	 }
	 
	 return {data:Data};
};*/

/*export const getDatasetByName=async(table_name)=>{ NOT USED
	const tables=[];

	try{
		const table= await api.post("/get-tabel-byName",{table:table_name});
		tables.push(table.data);
	}catch(err){
		console.error(err.message);    
	 }
	 return tables;
};*/
