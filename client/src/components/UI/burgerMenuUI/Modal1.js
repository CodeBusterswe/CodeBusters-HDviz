import React, {useState} from "react"
import Modal from "react-modal"
import MyCSVReader from "./MyCSVReader"
import DimList from "./DimList"
import {Button} from "react-bootstrap"
import { useStore } from "../../../ContextProvider"
import {toJS} from "mobx"
import {observer, useLocalObservable} from "mobx-react-lite"

const Modal1 = observer((props) => {
	const {
		modal1IsOpen,
		closeModal1
	} = props
	const viewModel = useStore();
	const [localDimensions, setLocalDimensions] = useState(toJS(viewModel.getDimensions()))
	const [localData, setLocalData] = useState()	
	function loadDataAndDims(){
		//devo anche aggiornare i selectedData con le nuove dimensioni selezionate
		if(localData)
			viewModel.loadDataAndDims(localData, localDimensions)//questo viene chiamato quando l'utente cambia il file
		else	
			viewModel.updateDims(localDimensions) //quessto viene chiamato quando l'utente aggiorna le dimensioni

		closeModal1()
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
		console.log(localDimensions)
	}
	function selectDimension(event){
		let temp = [...localDimensions]
		temp.forEach(dimension =>{
			if(dimension.value === event.target.id)
				dimension._isChecked = event.target.checked
		})
		setLocalDimensions(temp)
		console.log(localDimensions)
	}
	function areAllSelected(){
		return localDimensions.length === localDimensions.filter(d => d._isChecked).length
	}
	return (
		<Modal
			isOpen={modal1IsOpen}
			onRequestClose={closeModal1}
			ariaHideApp={false}
		>
			<div>
				<MyCSVReader setLocalStates={setLocalStates}/>
				<DimList dimensions={localDimensions} selectAllDimensions={selectAllDimensions} selectDimension={selectDimension} allSelected={areAllSelected()}/>
				<Button variant="success" onClick={loadDataAndDims}>Conferma selezione</Button>
				<Button variant="danger" onClick={closeModal1}>Torna al menù</Button>
			</div>
		</Modal>
            
	)
})

export default Modal1