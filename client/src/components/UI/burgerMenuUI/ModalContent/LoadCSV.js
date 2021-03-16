import React, {useState} from "react";
import {Button} from "react-bootstrap"
import MyCSVReader from "./MyCSVReader"
import DimList from "./DimList"
import { useStore } from "../../../../ContextProvider"
import Modal from "react-bootstrap/Modal"
import { ModalBody, ModalFooter } from "react-bootstrap"

const LoadCSV = props => {
	const viewModel = useStore();
	const [localDimensions, setLocalDimensions] = useState(viewModel.getDimensions());
	const [localData, setLocalData] = useState();
	const {
		modalIsOpen,
		closeModal
	} = props
	
	function loadDataAndDims(){
		console.time("clickLoadData");
		//devo anche aggiornare i selectedData con le nuove dimensioni selezionate
		if(localData)
			viewModel.loadDataAndDims(localData, localDimensions)//questo viene chiamato quando l'utente cambia il file
		else	
			viewModel.updateDims(localDimensions) //quessto viene chiamato quando l'utente aggiorna le dimensioni
		//funzione utilizzata da CSV Reader per salvare localmente dati e dimensioni
		resetAndClose();
		console.timeEnd("clickLoadData");
	}

	function resetAndClose(){
		setLocalData();
		closeModal()
	}
	//funzione utilizzata da CSV Reader per salvare localmente dati e dimensioni
	function setLocalStates(newData, newDims){
		setLocalData(newData);
		setLocalDimensions(newDims);
	}
	function selectAllDimensions(event){
		let temp = [...localDimensions]
		temp.forEach(dimension => {
			dimension._isChecked = event.target.checked
		});
		setLocalDimensions(temp)
	}
	function selectDimension(event){
		let temp = [...localDimensions]
		temp.forEach(dimension =>{
			if(dimension.value === event.target.id)
				dimension._isChecked = event.target.checked
		})
		setLocalDimensions(temp)
	}
	function areAllSelected(){
		return localDimensions.length === localDimensions.filter(d => d._isChecked).length
	}
	return(
		<Modal
			show={modalIsOpen}
			onHide={closeModal}
		>
			<Modal.Header closeButton>
				<Modal.Title>Carica i dati</Modal.Title>
			</Modal.Header>

			<ModalBody>
				<div>
					<MyCSVReader setLocalStates={setLocalStates}/>
					<DimList dimensions={localDimensions} selectAllDimensions={selectAllDimensions} 
						selectDimension={selectDimension} allSelected={areAllSelected()}/>
				</div>
			</ModalBody>
			
			<ModalFooter>
				<Button variant="secondary" onClick={resetAndClose}>Torna al menù</Button>
				<Button variant="primary" onClick={loadDataAndDims}>Conferma selezione</Button>
			</ModalFooter>
		</Modal>
	)
}

export default LoadCSV
