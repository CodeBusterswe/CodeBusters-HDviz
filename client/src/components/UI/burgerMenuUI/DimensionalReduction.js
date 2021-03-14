import React, {useState} from "react"
import { useStore } from "../../../ContextProvider"
import DimListRedux from "./DimListRedux"
import SelectorDimension from "./SelectorDimension"

const DimensionalReduction = props => {
	const viewModel = useStore()
	const {
		dims,
		handleChangeDims,
		drAlgo,
		changeAlgo,
		changeNewDimName,
		newDimName,
		changeNNewDim,
		nNewDim,
		renderParams
	} = props

	return (

		<div className="w-75 mx-auto d-flex justify-content-between align-items-center">
			<DimListRedux dims={dims} updateDims={handleChangeDims}/>
			<SelectorDimension/>
			<div className="d-flex flex-column">
				<label forhtml="dimName">Nome della/e nuove dimensioni</label>
				<input id="dimName" type="text" onChange={changeNewDimName} value={newDimName}></input>
				<label forhtml="nNewDim">Dimensioni di ritorno</label>
				<input id="nNewDim" type="number" onChange={changeNNewDim} value={nNewDim}></input>
			</div>
		</div>

	)
}

export default DimensionalReduction