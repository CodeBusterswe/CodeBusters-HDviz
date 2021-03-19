import React, {useState,useEffect} from "react";
import MyCSVReader from "../MyCSVReader"
import DimList from "../DimList"
import { useStore } from "../../../../../ContextProvider"
import Modal from "react-bootstrap/Modal"
import { ModalBody, ModalFooter,Dropdown,DropdownButton,ButtonGroup,Container,Row,Col ,Spinner,Button} from "react-bootstrap"
import {DropDown} from "./component"
const LoadDataFromDB = props => {
	const viewModel = useStore();
	const [localDimensions, setLocalDimensions] = useState(viewModel.getDimensions());
	const [getTable,setTables] = useState(null)
	const [loading,setLoading] = useState(false)
	const [getColumns,setColumns] = useState(null)
	//console.log("col:",getColumns, "getTable:",getTable)
	const [localData, setLocalData] = useState();
	const {
		modalIsOpen,
		closeModal
	} = props

	async function viewData(){
		const data=await viewModel.getAllTables()
		console.log("data:",data[0].length);
		setTables(data)
		//setLoading(true)
	}

	useEffect(async() => {
	/*	const data=await viewModel.getAllTables()
		console.log("data:",data);
		setTables(data)*/
		viewData();
		const col =await viewModel.getColumnsWithName();
		setColumns(col);		
		return () => {
		}
	},[])

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
			dimension.isChecked(event.target.checked)
		});
		setLocalDimensions(temp)
	}
	function selectDimension(event){
		let temp = [...localDimensions]
		temp.forEach(dimension =>{
			if(dimension.getValue() === event.target.id)
				dimension.isChecked(event.target.checked)
		})
		setLocalDimensions(temp)
	}
	function areAllSelected(){
		return localDimensions.length === localDimensions.filter(d => d.getChecked()).length
	}

	function handleData(table_name){
		console.log("selected:",table_name)
		viewModel.getTableWithName(table_name)	
	}
	return(
		<Modal
			show={modalIsOpen}
			onHide={closeModal}
		>
			<Modal.Header closeButton>
				<Modal.Title>Seleziona Dataset</Modal.Title>
			</Modal.Header>
			<ModalBody>
				{getTable?<DropDown Dataset={getTable} Columns={getColumns}/>:
					<Button variant="primary" disabled>
						<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
							Loading...
					</Button>
				}
			</ModalBody>
			
			<ModalFooter>
				<Button variant="secondary" onClick={resetAndClose}>Torna al menù</Button>
				<Button variant="primary" onClick={loadDataAndDims}>Conferma selezione</Button>
			</ModalFooter>
		</Modal>
	)
}

export default LoadDataFromDB
