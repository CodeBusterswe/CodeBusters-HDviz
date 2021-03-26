import React, {useState,useEffect} from "react";
import { useStore } from "../../../../../ContextProvider";
import {Modal,Alert, Form} from "react-bootstrap";
import { ModalBody, ModalFooter,Spinner,Button} from "react-bootstrap";
import Select from "react-select";
import {DropDown} from "./component";
import {OptionList} from "./component";
const LoadDataFromDB = props => {
	const viewModel = useStore();
	const [localDimensions, setLocalDimensions] = useState(viewModel.getDimensions());
	const [tables, setTables] = useState(null);
	const [columns, setColumns] = useState([]);
	const [table, setTable] = useState(null);
	const [selectedColumns, setSelectedColumns] = useState([]);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showDanger, setShowDanger] = useState(false);
	const [localData, setLocalData] = useState();

	const {
		modalIsOpen,
		closeModal
	} = props;
	async function viewData(){
		const data=await viewModel.getAllTables();
		console.log(data);
		setTables(data[0].map(d => d.table_name));
	}
	async function getColumns(table){
		const columns=await viewModel.getColumnList(table);
		setColumns(columns);
	}
	function handleSelectTable(e){
		setTable(e.target.value);
		getColumns(e.target.value);
		setSelectedColumns([]);
	}
	useEffect(() => {
		viewData();
	},[]);

	function handleChangeColumns (value, handler){
		console.log("handle colums:",value, handler);
		switch(handler.action){
		case "select-option":
			setSelectedColumns(value);
			return;
		case "remove-value":
			setSelectedColumns(value);
			return;
		case "clear":
			setSelectedColumns([]);
			return;
		default:
			return;
		}
	}
	function loadDataAndDims(){
		console.time("clickLoadData");
		//devo anche aggiornare i selectedData con le nuove dimensioni selezionate
		if(localData)
			viewModel.loadDataAndDims(localData, localDimensions);//questo viene chiamato quando l'utente cambia il file
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

	function hanldeAllOptions(newData,dims){
		setLocalData(newData);
		setLocalDimensions(dims);
		//console.log("Load DataFromDB:",newData, "dims:",dims);
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
					<Form>
						{tables ? <Form.Group controlId="distanceMatrix">
							<Form.Label>Distance Matrix</Form.Label>
							<Form.Control
								custom
								as="select"
								value={table}
								onChange={handleSelectTable}
							>
								{tables.map((d) => {
									return <option value={d} key={d}>{d}</option>;
								})}
							</Form.Control>
						</Form.Group>: null}
						{table?<Form.Group controlId="dimensionsToReduxList">
							<Form.Label>Select the dimensions to use</Form.Label>
							<Select
								value={selectedColumns}
								options={columns}
								isMulti
								name="toReduxDimensionsList"
								className="basic-multi-select"
    							classNamePrefix="select"
								closeMenuOnSelect={false}
								onChange={handleChangeColumns}
							/>
						</Form.Group> : null
						}
					</Form>
					{selectedColumns?<OptionList options={selectedColumns} table={table} hanldeAllOptions={hanldeAllOptions} />:null}
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
