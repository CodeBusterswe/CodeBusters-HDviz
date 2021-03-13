import React from 'react'
import { CSVReader } from 'react-papaparse'
import { useStore } from "../../../ContextProvider";

const MyCSVReader = props => {

    const viewModel = useStore()

    function handleOnDrop(file){
        viewModel.readFile(file)
    }
    function handleOnError(error){
        console.log("errore")
    }
    return (
        <CSVReader
            onDrop={handleOnDrop}
            onError={handleOnError}
            removeButtonColor='#ff0000'
            onRemoveFile={viewModel}
        >
            <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
    )
}

export default MyCSVReader