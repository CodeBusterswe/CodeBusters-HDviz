import {api} from "./ApiURL"

export const getDataset=async()=>{
	const table="dataset"
	const Data=[];
	//console.log("Data api: ", Data)
	try{
		const dataSet= await api.post("/get-all-data",{table:table});
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
		//console.log("tablesSet api: ", tablesSet.tables)
		tables.push(table.data);
	}catch(err){
		console.error(err.message);    
	 }
	 //console.log("Data api: ", Data)
	 return tables;
}