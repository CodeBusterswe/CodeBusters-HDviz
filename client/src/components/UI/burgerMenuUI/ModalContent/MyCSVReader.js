import React,{useState} from "react"
import { CSVReader } from "react-papaparse"
import { useStore } from "../../../../ContextProvider"

function MyCSVReader(props){
	const [data, setdata] = useState(null)
	const {
		setLocalStates,
	} = props
	const viewModel = useStore()

	//get all dataset from csv table
	async function getDataset(){
		const dataset = await viewModel.getAllDataset();
		//console.log("dataset:",dataset);
		setdata(dataset);
		return dataset;
	}
	//console.log("inCsvReader:", getDataset(), "data:",data)

	function handleOnDrop(file){
		const [data, dimensions] = viewModel.parseAndLoadCsvData(file)
		setLocalStates(data, dimensions);
	}

	function handleOnError(error){
		console.log("errore:", error)
	}

	function handleSpan() {
		return viewModel.isDataLoaded() ? 
			<span>Carica un file CSV</span> : 
			<span>Sostituisci il file CSV caricato</span>
	}

	return (
		<CSVReader
			onDrop={handleOnDrop}
			onError={handleOnError}
			accept={".csv"}
		>
			{handleSpan()}
		</CSVReader>
	)
}
export default MyCSVReader