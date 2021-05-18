import React from "react";
import { CSVReader } from "react-papaparse";
import { useInstance } from "../../../../useInstance";
import { MyCSVReaderVM } from "./MyCSVReaderVM";

function MyCSVReader(props){
	const {
		setLocalStates,
	} = props;
	const {
		handleOnDrop,
		handleOnError,
	} = useInstance(new MyCSVReaderVM(setLocalStates));
	return (
		<>
			<CSVReader
				onDrop={handleOnDrop.bind(null)}
				onError={handleOnError.bind(null)}
				accept={".csv"}
			>
				Rilascia qui il tuo file CSV o clicca per caricare
			</CSVReader>
		</>
	);
}
export default MyCSVReader;