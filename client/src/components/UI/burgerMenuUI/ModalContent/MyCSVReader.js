import React from "react";
import { CSVReader } from "react-papaparse";
import { useStore } from "../../../../ContextProvider";

function MyCSVReader(props){
	const {
		setLocalStates,
	} = props;
	const viewModel = useStore();
	function handleOnDrop(file){
<<<<<<< HEAD
		const [data, dimensions] = viewModel.parseAndLoadCsvData(file)
=======
		const [data, dimensions] = viewModel.parseAndLoadCsvData(file);
		console.log("CSV reader:", data, "dimensions:",dimensions);
>>>>>>> 2235f7cb5e631c722e5f6637ec5d385ab421c494
		setLocalStates(data, dimensions);
	}

	function handleOnError(error){
		console.log("errore:", error);
	}

	function handleSpan() {
		return viewModel.isDataLoaded() ? 
			<span>Carica un file CSV</span> : 
			<span>Sostituisci il file CSV caricato</span>;
	}

	return (
		<CSVReader
			onDrop={handleOnDrop}
			onError={handleOnError}
			accept={".csv"}
		>
			{handleSpan()}
		</CSVReader>
	);
}
export default MyCSVReader;