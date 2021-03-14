import React, {useState} from "react";
import {Button} from "react-bootstrap"
import {observer} from "mobx-react-lite"
import MyCSVReader from "./MyCSVReader"
import DimList from "./DimList"
import { toJS } from "mobx"
import { useStore } from "../../../../ContextProvider"

const LoadCSV = observer(props => {
	const viewModel = useStore();
	const [localDimensions, setLocalDimensions] = useState(toJS(viewModel.getDimensions()))
	const [localData, setLocalData] = useState()
	const {
		closeModal
	} = props
	
	function loadDataAndDims(){
		//devo anche aggiornare i selectedData con le nuove dimensioni selezionate
		if(localData)
			viewModel.loadDataAndDims(localData, localDimensions)//questo viene chiamato quando l'utente cambia il file
		else	
			viewModel.updateDims(localDimensions) //quessto viene chiamato quando l'utente aggiorna le dimensioni
		//funzione utilizzata da CSV Reader per salvare localmente dati e dimensioni
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
	return(
		<div>
			<MyCSVReader setLocalStates={setLocalStates}/>
			<DimList dimensions={localDimensions} selectAllDimensions={selectAllDimensions} selectDimension={selectDimension} allSelected={areAllSelected()}/>
			<Button variant="success" onClick={loadDataAndDims}>Conferma selezione</Button>
		</div>
	)
})

export default LoadCSV
