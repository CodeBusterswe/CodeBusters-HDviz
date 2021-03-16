import React from "react"
import { CSVReader } from "react-papaparse"
import { useStore } from "../../../../ContextProvider"
import { toJS } from "mobx"

function MyCSVReader(props) {
	const config = {
		delimiter : ","
	}
	const {
		setLocalStates,
		isFileLoaded
	} = props
	const viewModel = useStore()

	function handleOnDrop(file){
		console.log(file);
		const [data, dimensions] = viewModel.parseAndLoadCsvData(file)
		setLocalStates(data, dimensions);
		isFileLoaded(true);
	}

	function handleOnError(error){
		console.log("errore:", error)
	}

	function handleSpan() {
		return toJS(viewModel.getOriginalData()).length === 0 ? 
			<span>Carica un file CSV</span> : 
			<span>Sostituisci il file CSV caricato</span>
	}

	return (
		<CSVReader
			onDrop={handleOnDrop}
			onError={handleOnError}
			accept={".csv"}
			config={ config }
		>
			{handleSpan()}
		</CSVReader>
	)
}
export default MyCSVReader