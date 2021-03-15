import React, { useState } from "react"
import { useStore } from "../../../../ContextProvider"
import DimListRedux from "./DimListRedux"
import SelectorDimension from "./SelectorDimension"

const DimensionalReduction = props => {
	const [drAlgo, setDrAlgo] = useState("FASTMAP");
	const [newDimName, setNewDimName] = useState("FASTMAP");
	const [neighbors, setNeighbors] = useState(30);
	const [nNewDim, setNNewDim] = useState(2);
	const viewModel = useStore()
	const {
		dims,
		handleChangeDims,
		reduxDims
	} = props

	function changeNeighbours(e){
		setNeighbors(e.target.value);
	}
	function changeAlgo(e){
		setNewDimName(e.target.value)
		setDrAlgo(e.target.value)
	}
	function changeNewDimName(e){
		setNewDimName(e.target.value)
	}
	function changeNNewDim(e){
		setNNewDim(e.target.value)
	}

	function renderParams() {
		switch (drAlgo) {
		case "FASTMAP":
			return <span>Nessun parametro configurabile</span>;
		case "TSNE":
			return <span>Nessun parametro configurabile</span>;
		case "ISOMAP":
			return <label><input name="k" type="range" min={10} max={300} value={neighbors} onChange={changeNeighbours} /> neighbors <i>k</i><p>{neighbors}</p></label>;
		case "LLE":
			return <label><input name="k" type="range" min={10} max={300} value={neighbors} onChange={changeNeighbours} /> neighbors <i>k</i><p>{neighbors}</p></label>;
		default:
			return <span>Nulla configurabile</span>;
		}
	}

	return (
		<div>
			<DimListRedux dims={dims} updateDims={handleChangeDims} />
			<select value={drAlgo} onChange={changeAlgo}>
				<option value={"FASTMAP"}>FASTMAP</option>
				<option value={"LLE"}>LLE</option>
				<option value={"ISOMAP"}>ISOMAP</option>
				<option value={"TSNE"}>TSNE</option>
			</select>
			<div>
				<label forhtml="dimName">Nome della/e nuove dimensioni</label>
				<input type="text" onChange={changeNewDimName} value={newDimName}></input>
				<label forhtml="nNewDim">Dimensioni di ritorno</label>
				<input type="number" onChange={changeNNewDim} value={nNewDim}></input>
			</div>
			{
				renderParams()
			}
			<button onClick={reduxDims}>Redux Dims</button>
		</div>
	)
}

export default DimensionalReduction