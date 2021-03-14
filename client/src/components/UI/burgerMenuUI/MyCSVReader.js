import React from "react"
import { CSVReader } from "react-papaparse"
import { useStore } from "../../../ContextProvider";

function MyCSVReader(props) {
	const {
		setLocalStates 
	} = props
	const viewModel = useStore()

	function handleOnDrop(file){
		const [data, dimensions] = viewModel.parseAndLoadCsvData(file)
		setLocalStates(data, dimensions);
	}
	function handleOnError(error){
		console.log("errore:", error)
	}
	return (
		<CSVReader
			onDrop={handleOnDrop}
			onError={handleOnError}
		>
			<span>Drop CSV file here or click to upload.</span>
		</CSVReader>
	)
}
export default MyCSVReader