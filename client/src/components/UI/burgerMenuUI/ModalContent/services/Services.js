import {api} from "./ApiURL";

//restituisce il valore delle colonne selezionate
export const getDatasetWithParams=async(selectedColumns,table)=>{
	try{
		const selectField=selectedColumns.map(item => item.value);
		const dataSet= await api.post("/get-data",{selectField, table});

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
		const dataSet= await api.post("/get-custom-data",{selectField, params});
		
		return dataSet;
	}catch(err){
		console.error(err.message);    
	 }
};

//ritorna tutte le tabelle presenti nel database
export const getTables=async()=>{
	try{
		const table= await api.get("/get-tables");
		return table.data;
		
	}catch(err){
		console.error(err.message);    
	}
};

//Ritorna le colonne di una tabella
export const getColumnsByName=async(table_name)=>{
	try{
		const columns = await api.post("/get-columns",{table:table_name});
		return columns.data;
		
	}catch(err){
		console.error(err.message);    
	 }
};