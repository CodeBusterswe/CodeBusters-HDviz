import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../ContextProvider";
import { useInstance } from "../../../../useInstance";
import {Modal,Alert, Form, Col, Spinner} from "react-bootstrap";
import { ModalBody, ModalFooter, Button} from "react-bootstrap";
import Select from "react-select";
import { LoadDataFromDBVM } from "./LoadDataFromDBVM";
const LoadDataFromDB = observer((props) => {
	const {
		modalIsOpen,
		closeModal
	} = props;
	const {
		selectedColumns,
		showSuccess,
		setShowSuccess,
		showDanger,
		setShowDanger,
		conditionValue,
		conditionSign,
		conditionColumn,
		handleConfirm,
		handleDismiss,
		handleSelectTable,
		table,
		tables,
		getColumns,
		getTables,
		columns,
		handleChangeColumns,
		handleSelectConditionColumn,
		handleSelectConditionSign,
		handleSelectConditionValue,
		clicked,
		empty,
		resultLength,
		onSubmit,
	} = useInstance(new LoadDataFromDBVM(useStore(), closeModal));

	useEffect(() =>{
		getColumns();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [table]);

	useEffect(() => {
		getTables();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	useEffect(() => {
		const time = 4000;
		let timer = setTimeout(() => setShowSuccess(false), time);
		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[showSuccess]);
	
	useEffect(() => {
		const time = 4000;
		let timer = setTimeout(() => setShowDanger(false), time);
		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[showDanger]);

	return(
		<div>
			<Modal
				show={modalIsOpen}
				onHide={handleDismiss}
			>
				<Modal.Header closeButton>
					<Modal.Title>Seleziona Dataset</Modal.Title>
				</Modal.Header>
				<ModalBody>
					<Form>
						{tables!==null ?
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
							</Form.Group>: 
							<div className="d-flex">
								<span>Assicurati di aver acceso il server...</span>
								<Spinner animation="border" variant="primary"/>
							</div>}
						{columns.length>0 ? 
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
							<Form.Row className="align-items-center">
								<Col>
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
								</Col>
								<Col xs={4}>
									<Form.Group as={Col} controlId="conditionSign">
										<Form.Label>sign</Form.Label>
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
											<option value={"<"} key={"less"}>{"<"}</option>
											<option value={">"} key={"greater"}>{">"}</option>
										</Form.Control>
									</Form.Group>
								</Col>
								<Col xs={4}>
									<Form.Group as={Col} controlId="conditionValue">
										<Form.Label>Value</Form.Label>
										<Form.Control
											as="input"
											value={conditionValue}
											defaultValue={undefined}
											onChange={handleSelectConditionValue}
										>
										</Form.Control>
									</Form.Group>
								</Col>
							</Form.Row>
							<Form.Row className="align-items-center">
								<Button variant="primary" onClick={onSubmit()}>Invia query</Button>
								{clicked ? <Alert variant ={empty ? "danger" : "success"} >{resultLength} elementi trovati</Alert>:null}
							</Form.Row>
							</> : null
						}
						
					</Form>
				</ModalBody>
				
				<ModalFooter>
					<Button variant="secondary" onClick={handleDismiss}>Torna al menù</Button>
					<Button variant="primary" onClick={handleConfirm}>Conferma selezione</Button>
				</ModalFooter>
			</Modal>
			<Alert show={showSuccess} variant="success" className="alert" dismissible onClose={setShowSuccess(false)}>
				<Alert.Heading>Dati inseriti correttamente</Alert.Heading>
				<p>
					Ora puoi applicare una riduzione dimensionale ai tuoi dati o scegliere subito la visualizzazione che più preferisci
				</p>
			</Alert>
			<Alert show={showDanger} variant="danger" className="alert" dismissible onClose={setShowDanger(false)}>
				<Alert.Heading>Avviso</Alert.Heading>
				<p>
					Nessun dato è stato caricato. Assicurati di aver eseguito la query e premuto il tasto "<strong>Conferma selezione</strong>"
				</p>
			</Alert> 
		</div>
	);
});

export default LoadDataFromDB;
