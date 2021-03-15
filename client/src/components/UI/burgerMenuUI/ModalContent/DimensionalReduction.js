import React, { useState } from "react"
import { useStore } from "../../../../ContextProvider"
import Modal from "react-bootstrap/Modal"
import { Button, ModalBody, ModalFooter } from "react-bootstrap"
import {AlgorithmType} from "../../../../utils"

const DimensionalReduction = props => {
	const [algorithmType, setAlgorithmType] = useState(AlgorithmType.FastMap);	
	const [newDimensionsName, setNewDimensionsName] = useState(AlgorithmType.FastMap);
	const [neighbors, setNeighbors] = useState(30);
	const [newDimensionsNumber, setNewDimensionsNumber] = useState(2);
	
	const viewModel = useStore()
	const {
		modalIsOpen,
		closeModal
	} = props

	function changeNeighbours(e){
		setNeighbors(e.target.value);
	}
	function handleChangeAlgorithmType(e){
		setNewDimensionsName(e.target.value)
		setAlgorithmType(e.target.value)
	}
	function handleChangeNewDimensionsName(e){
		setNewDimensionsName(e.target.value)
	}
	function handleChangeNewDimensionsNumber(e){
		setNewDimensionsNumber(e.target.value)
	}

	function renderParams() {
		switch (algorithmType) {
		case AlgorithmType.FastMap:
			return <span>Nessun parametro configurabile</span>;
		case AlgorithmType.tSNE:
			return <span>Nessun parametro configurabile</span>;
		case AlgorithmType.IsoMap:
			return <label><input name="k" type="range" min={10} max={300} value={neighbors} onChange={changeNeighbours} /> neighbors <i>k</i><p>{neighbors}</p></label>;
		case AlgorithmType.LLE:
			return <label><input name="k" type="range" min={10} max={300} value={neighbors} onChange={changeNeighbours} /> neighbors <i>k</i><p>{neighbors}</p></label>;
		default:
			return <span>Nulla configurabile</span>;
		}
	}

	return (
		<Modal
			show={modalIsOpen}
			onHide={closeModal}
		//ariaHideApp={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Riduzione dimensionale</Modal.Title>
			</Modal.Header>

			<ModalBody>
				<select value={algorithmType} onChange={handleChangeAlgorithmType}>
					<option value={AlgorithmType.FastMap}>FASTMAP</option>
					<option value={AlgorithmType.LLE}>LLE</option>
					<option value={AlgorithmType.IsoMap}>ISOMAP</option>
					<option value={AlgorithmType.tSNE}>TSNE</option>
				</select>
				<div>
					<label forhtml="dimName">Nome della/e nuove dimensioni</label>
					<input type="text" onChange={handleChangeNewDimensionsName} value={newDimensionsName}></input>
					<label forhtml="nNewDim">Dimensioni di ritorno</label>
					<input type="number" onChange={handleChangeNewDimensionsNumber} value={newDimensionsNumber}></input>
				</div>
				{
					renderParams()
				}
			</ModalBody>
			
			<ModalFooter>
				<Button onClick={()=>console.log("Redux")}>Redux Dims</Button>
				<Button variant="secondary" onClick={closeModal}>Torna al menù</Button>
			</ModalFooter>
		</Modal>
	)
}

export default DimensionalReduction