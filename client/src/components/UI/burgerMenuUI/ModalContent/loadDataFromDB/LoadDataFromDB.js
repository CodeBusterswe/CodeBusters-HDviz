import React, {useState,useEffect} from "react";
import { useStore } from "../../../../../ContextProvider";
import {Modal,Alert} from "react-bootstrap";
import { ModalBody, ModalFooter,Spinner,Button} from "react-bootstrap";
import {DropDown} from "./component";
const LoadDataFromDB = props => {
	const viewModel = useStore();
	const [localDimensions, setLocalDimensions] = useState(viewModel.getDimensions());
	const [getTable,setTables] = useState(null);
	const [getColumns,setColumns] = useState(null);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showDanger, setShowDanger] = useState(false);
	const [localData, setLocalData] = useState();

	const {
		modalIsOpen,
		closeModal
	} = props;

	async function viewData(){
		const data=await viewModel.getAllTables();
		setTables(data);
	}

	useEffect(async() => {
		viewData();
	},[]);

	function loadDataAndDims(){
		console.time("clickLoadData");
		//devo anche aggiornare i selectedData con le nuove dimensioni selezionate
		if(localData)
			viewModel.loadDataAndDims(localData, localDimensions);//questo viene chiamato quando l'utente cambia il file
		else	
			viewModel.updateDims(localDimensions); //quessto viene chiamato quando l'utente aggiorna le dimensioni
		//funzione utilizzata da CSV Reader per salvare localmente dati e dimensioni
		resetAndClose();
	}

	function resetAndClose(){
		setLocalData();
		closeModal();
	}

	function openAlertSuccess() {
		return viewModel.getCheckedDimensions().length !== 0 ?
			setShowSuccess(true) :
			setShowDanger(true);
	}
	useEffect(() => {
		const time = 3000;
		let timer = setTimeout(() => setShowSuccess(false), time);
		return () => clearTimeout(timer);
	},[showSuccess]);

	function openAlertDanger() {
		setShowDanger(true);
	}
	
	useEffect(() => {
		const time = 3000;
		let timer = setTimeout(() => setShowDanger(false), time);
		return () => clearTimeout(timer);
	},[showDanger]);

	function getAllOptions(newData,dims){
		setLocalData(newData);
		setLocalDimensions(dims);
		console.log("Load DataFromDB:",newData, "dims:",dims);
	}

	return(
		<div>
			<Modal
				show={modalIsOpen}
				onHide={()=>{closeModal();openAlertDanger();}}
			>
				<Modal.Header closeButton>
					<Modal.Title>Seleziona Dataset</Modal.Title>
				</Modal.Header>
				<ModalBody>
					{getTable?<DropDown Dataset={getTable} /* Columns={getColumns} */ getAllOptions={getAllOptions}/>:
						<Button variant="primary" disabled>
							<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
								Loading...
						</Button>
					}
				</ModalBody>
				
				<ModalFooter>
					<Button variant="secondary" onClick={resetAndClose}>Torna al menù</Button>
					<Button variant="primary" onClick={()=>{loadDataAndDims(); openAlertSuccess();}}>Conferma selezione</Button>
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
		</div>
	);
};

export default LoadDataFromDB;
