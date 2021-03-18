import React, {useState,useEffect} from "react";
import {Button} from "react-bootstrap"
import MyCSVReader from "./MyCSVReader"
import DimList from "./DimList"
import { useStore } from "../../../../ContextProvider"
import Modal from "react-bootstrap/Modal"
import { ModalBody, ModalFooter,Dropdown,DropdownButton,ButtonGroup } from "react-bootstrap"

const LoadDataFromDB = props => {
	const viewModel = useStore();
	const [localDimensions, setLocalDimensions] = useState(viewModel.getDimensions());
	const [getTable,setTables] =useState()
	console.log("getTable:",getTable)
	const [localData, setLocalData] = useState();
	const {
		modalIsOpen,
		closeModal
	} = props

	useEffect(async() => {
		const tab=await viewModel.getAllTables()
		setTables(tab)
		return () => {
		}
	}, [])

	const data=[{table_name:"Iris"},{table_name:"Matrix"}]
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

	function handleData(){

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
		 	<div>
					{["Primary"].map(
						(variant)=>
							<DropdownButton as={ButtonGroup}
								key={variant}
								id={`dropdown-variants-${variant}`}
								variant={variant.toLowerCase()}
								title={"Data set"}
							>
								{!getTable?<h6>Loading...</h6>:getTable[0].map((item,index)=>
									<React.Fragment key={index}>
										<Dropdown.Item Key={item.table_name} eventKey={variant} onClick={()=>handleData(item.table_name)}>{item.table_name} {index}</Dropdown.Item>
									</React.Fragment>
								)}
							</DropdownButton>
						,
					)}
				</div>
			</ModalBody>
			
			<ModalFooter>
				<Button variant="secondary" onClick={resetAndClose}>Torna al menù</Button>
				<Button variant="primary" onClick={loadDataAndDims}>Conferma selezione</Button>
			</ModalFooter>
		</Modal>
	)
}

export default LoadDataFromDB
