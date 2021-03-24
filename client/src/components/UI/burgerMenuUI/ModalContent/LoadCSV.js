import React, {useState , useEffect} from "react";
import {Button} from "react-bootstrap"
import MyCSVReader from "./MyCSVReader"
import DimList from "./DimList"
import { useStore } from "../../../../ContextProvider"
import { ModalBody, ModalFooter ,Alert , Modal } from "react-bootstrap"
import "../../../style.css"

const LoadCSV = props => {
	const viewModel = useStore();
	const [localDimensions, setLocalDimensions] = useState(viewModel.getDimensions());
	const [localData, setLocalData] = useState();
	const [showSuccess, setShowSuccess] = useState(false);
	const [showDanger, setShowDanger] = useState(false);
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
		console.log("event:",event);
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
	
	function openAlertSuccess() {
		return viewModel.getCheckedDimensions().length !== 0 ?
			setShowSuccess(true) :
			setShowDanger(true)
	}
	
	useEffect(() => {
		const time = 4000
		let timer = setTimeout(() => setShowSuccess(false), time)
		return () => clearTimeout(timer)
	},[showSuccess])

	function openAlertDanger() {
		setShowDanger(true)
	}
	
	useEffect(() => {
		const time = 4000
		let timer = setTimeout(() => setShowDanger(false), time)
		return () => clearTimeout(timer)
	},[showDanger])

	return(
		<>
			<Modal
				show={modalIsOpen}
				onHide={() => {closeModal();openAlertDanger();}}
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
					<Button variant="secondary" onClick={() => {resetAndClose();openAlertDanger();}}>Torna al menù</Button>
					<Button variant="primary" onClick={()=>{loadDataAndDims();openAlertSuccess();}}>Conferma selezione</Button>
				</ModalFooter>
			</Modal>
			<Alert show={showSuccess} variant="success" className="alert" dismissible onClose={() => setShowSuccess(false)}>
				<Alert.Heading>Dati inseriti correttamente</Alert.Heading>
				<p>
					Ora puoi applicare una riduzione dimensionale ai tuoi dati o scegliere subito la visualizzazione che più preferisci
				</p>
			</Alert>
			<Alert show={showDanger} variant="danger" className="alert" dismissible onClose={() => setShowDanger(false)}>
				<Alert.Heading>Avviso</Alert.Heading>
				<p>
					Nessun dato è stato caricato. Assicurati di aver inserito il file e premuto il tasto "<strong>Conforma selezione</strong>"
				</p>
			</Alert> 
		</>
	)
}

export default LoadCSV
