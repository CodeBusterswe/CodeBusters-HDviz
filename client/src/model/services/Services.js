import {api} from "./ApiURL";

//restituisce il valore delle colonne selezionate
export const getDatasetWithParams=async(columnSelected,table_name)=>{
	function getData(){
		return columnSelected.map((item, i) => {
			return item.value;
		});
	}
	try{
		const selectField=getData();
		const dataSet= await api.post("/get-data",{selectField,table_name});
		return dataSet.data;
	}catch(err){
		console.error(err.message);    
	 }
};

// ritorna il valore della query personalizzata
export const getDatasetWithCustomParams=async(selectedColumns, conditionSign, conditionColumn, conditionValue, table)=>{
	let params = {conditionSign, conditionColumn, conditionValue, table};
	function getData(){
		return selectedColumns.map((item, i) => {
			return item.value;
		});
	} 
	try{
		const selectField=getData();
		const dataSet= await api.post("/get-custom-data",{selectField, params});
		return dataSet.data;
	}catch(err){
		console.error(err.message);    
	 }
};

// ritirna i dataset presenti nel database
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
};

export const getTables=async()=>{
	try{
		const table= await api.get("/get-tables");
		return table.data;
	}catch(err){
		console.error(err.message);    
	}
};

export const getDatasetByName=async(table_name)=>{
	const tables=[];

	try{
		const table= await api.post("/get-tabel-byName",{table:table_name});
		tables.push(table.data);
	}catch(err){
		console.error(err.message);    
	 }
	 return tables;
};

export const getColumnByName=async(table_name)=>{
	const tables=[];
	try{
		const table= await api.post("/get-columns",{table:table_name});
		tables.push(table.data);
	}catch(err){
		console.error(err.message);    
	 }
	 return tables;
};
