import React, {useState,useEffect} from "react";
import { useStore } from "../../../../../ContextProvider";
import {Modal,Alert, Form} from "react-bootstrap";
import { ModalBody, ModalFooter, Button} from "react-bootstrap";
import Select from "react-select";
const LoadDataFromDB = props => {
	const viewModel = useStore();
	const [localData, setLocalData] = useState();
	const [localDimensions, setLocalDimensions] = useState();
	const [tables, setTables] = useState(null);
	const [columns, setColumns] = useState([]);
	const [table, setTable] = useState(null);
	const [selectedColumns, setSelectedColumns] = useState([]);
	const [conditionColumn, setConditionColumn] = useState("undefined");
	const [conditionSign, setConditionSign] = useState("undefined");
	const [conditionValue, setConditionValue] = useState("");
	const [clicked, setClicked] = useState(false);
	const [empty, setEmpty] = useState(false);
	const [resultLength, setResultLenght] = useState(0);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showDanger, setShowDanger] = useState(false);

	const {
		modalIsOpen,
		closeModal
	} = props;

	async function getTables(){
		const tables=await viewModel.getAllTables();
		setTables(tables.map(d => d.table_name));
		setTable(tables.map(d => d.table_name)[0]);
	}

	async function getColumns(){
		const columns=await viewModel.getColumnList(table);
		setColumns(columns);
	}

	function handleSelectTable(e){
		const tableName = e.target.value;
		setTable(tableName);
		setSelectedColumns([]);
		setConditionColumn("undefined");
		setConditionSign("undefined");
		setConditionValue("");
		setClicked(false);
		setResultLenght(0);
	}
	function handleSelectConditionColumn(e){
		const columnName = e.target.value;
		setConditionColumn(columnName);
	}
	function handleSelectConditionValue(e){
		const conditionValue = e.target.value;
		setConditionValue(conditionValue);
	}
	function handleSelectConditionSign(e){
		const conditionSign = e.target.value;
		setConditionSign(conditionSign);
	}

	async function getQueryResult(){
		let data;
		if(conditionValue!=="" && conditionSign!=="undefined" && conditionColumn!=="undefined")
			data = await viewModel.getDatasetByCustomParams(selectedColumns, conditionSign, conditionColumn, conditionValue, table);
		else
			data = await viewModel.getDatasetByParams(selectedColumns, table);
	   return data;
	}
	async function onSubmit(){
		setClicked(true);
		const parsedData=await getQueryResult();
		if(parsedData && parsedData.length>0){
			setEmpty(false);
			setResultLenght(parsedData.length);
			const dimensions = viewModel.parseAndLoadCsvDataFromDB(selectedColumns);
			setLocalData(parsedData);
			setLocalDimensions(dimensions);
		}else{
			setEmpty(true);
			setResultLenght(0);
		}
	}
	useEffect(() =>{
		getColumns();
	}, [table]);
	useEffect(() => {
		getTables();
	},[]);

	function handleChangeColumns (value, handler){
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
		if(localData)
			viewModel.loadDataAndDims(localData, localDimensions);
		resetAndClose();
	}

	function resetAndClose(){
		setSelectedColumns([]);
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
						{tables ? 
							<Form.Group controlId="tablesSelect">
								<Form.Label>Select table</Form.Label>
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
						{table ? 
							<><Form.Group controlId="columnsSelect">
								<Form.Label>Select the columns to use</Form.Label>
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
							</Form.Group>
							<Form.Group controlId="conditionColumn">
								<Form.Label>Where column</Form.Label>
								<Form.Control
									custom
									as="select"
									value={conditionColumn}
									onChange={handleSelectConditionColumn}
								>
									<option value={"undefined"} key={"noConditionColumn"}>No column</option>
									{columns.map((d) => {
										return <option value={d.value} key={d.value+"Condition"}>{d.label}</option>;
									})}
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="conditionSign">
								<Form.Label>Where sign</Form.Label>
								<Form.Control
									custom
									as="select"
									value={conditionSign}
									onChange={handleSelectConditionSign}
								>
									<option value={"undefined"} key={"noConditionSign"}>No condition</option>
									<option value={"like"} key={"like"}>{"like"}</option>
									<option value={"="} key={"equal"}>{"="}</option>
									<option value={"<="} key={"leq"}>{"<="}</option>
									<option value={">="} key={"geq"}>{">="}</option>
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="conditionValue">
								<Form.Label>Condition Value</Form.Label>
								<Form.Control
									custom
									as="input"
									value={conditionValue}
									defaultValue={undefined}
									onChange={handleSelectConditionValue}
								>
								</Form.Control>
							</Form.Group>
							<Button variant="primary" onClick={onSubmit}>Invia</Button>
							</> : null
						}
					</Form>
					{clicked ? <Alert variant ={empty ? "danger" : "success"} >{resultLength} elementi trovati</Alert>:null}
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
