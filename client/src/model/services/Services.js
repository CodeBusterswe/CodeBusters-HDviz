import {api} from "./ApiURL"

export const getDataset=()=>{
	try{
		const dataSet=api.get("/get-data");
		console.log("dataSet api: ", dataSet)
		return dataSet;
	}catch(err){
		console.error(err.message);    
	}
}