import React from 'react'
import { CSVReader } from 'react-papaparse'

const MyCSVReader = props => {
  const {
    handleOnDrop,
    handleOnError,
    handleOnRemoveFile
  } = props

    return (
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        removeButtonColor='#ff0000'
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
    )
}

export default MyCSVReader