import {api} from "./ApiURL"

export const getDataset=async()=>{
	const table="dataset"
	const Data=[];
	//console.log("Data api: ", Data)
	try{
		const dataSet= await api.post("/get-all-data",{table:table});
		console.log("dataSet api: ", dataSet.data)
		Data.push(dataSet.data);
	}catch(err){
		console.error(err.message);    
	 }
	 console.log("Data api: ", Data)
	 return {data:Data};
}