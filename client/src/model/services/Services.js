import {api} from "./ApiURL";

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

export const getDatasetWithCustomParams=async(params)=>{
	console.log("params:",params);
	var {columnSelected}=params;
	function getData(){
		return columnSelected.map((item, i) => {
			return item.value;
		});
	} 
	try{
		const selectField=getData();
		const dataSet= await api.post("/get-custom-data",{selectField,params});
		return dataSet.data;
	}catch(err){
		console.error(err.message);    
	 }
};

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
	const tables=[];
	try{
		const table= await api.get("/get-tables");
		tables.push(table.data);
	}catch(err){
		console.error(err.message);    
	 }
	 return tables;
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
