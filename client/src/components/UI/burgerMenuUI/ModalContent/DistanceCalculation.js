/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../ContextProvider";
import { useInstance } from "../../../../useInstance";
import Modal from "react-bootstrap/Modal";
import { Button, ModalBody, ModalFooter, Spinner, Alert } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Form from "react-bootstrap/Form";
import {DistanceType} from "../../../../utils";
import { DistanceCalculationVM } from "./DistanceCalculationVM";

const DistanceCalculation = observer((props) => {
	const {
		modalIsOpen,
		closeModal
	} = props;
	const {
		dimensionsToRedux,
		handleSubmit,
		optionList,
		handleChangeDimensionsToRedux,
		distanceType,
		handleChangeDistanceType,
		newDistanceMatrixName,
		handleChangeNewDistanceMatrixName,
		nameError,
		setIsLoading,
		isLoading,
		handleNormalize,
		showSuccess,
		setShowSuccess,
		showDanger,
		setShowDanger,
	}= useInstance(new DistanceCalculationVM(useStore(), closeModal));

	useEffect(()=>{	
		async function start(){
			await handleSubmit();
		}
		if(isLoading){
			start();
			setIsLoading(false);
		}
	},[isLoading]);

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

	return (
		<>
			<Modal
				show={modalIsOpen}
				onHide={closeModal}
			>
				<Form onSubmit= { (e) => {
					e.preventDefault();
					setIsLoading(true);
				}} noValidate>
					<Modal.Header closeButton>
						<Modal.Title>Riduzione dimensionale tramite calcolo delle distanze</Modal.Title>
					</Modal.Header>
					<ModalBody>
						<Form.Check 
							className="mb-2"
							custom
							type="checkbox"
							key="normalize"
							value="normalize"
							id="normalize"
							label="Normalizza i dati"
							onChange={handleNormalize}
						/>
						<Form.Group controlId="dimensionsToReduxList">
							<Form.Label>Seleziona dimensioni da utilizzare</Form.Label>
							<Select
								value={dimensionsToRedux}
								options={optionList}
								isMulti
								name="toReduxDimensionsList"
								className="basic-multi-select"
    						classNamePrefix="select"
								components={makeAnimated()}
								closeMenuOnSelect={false}
								onChange={handleChangeDimensionsToRedux}
							/>
						</Form.Group>
						<Form.Group controlId="distanceType">	
							<Form.Label>Tipo di distanza</Form.Label>
							<Form.Control 
								as="select" 
								custom 
								value={distanceType}
								onChange={handleChangeDistanceType}>
								<option value={DistanceType.Euclidean}>EUCLIDEA</option>
								<option value={DistanceType.Canberra}>CANBERRA</option>
								<option value={DistanceType.Chebyshev}>CHEBYSHEV</option>
								<option value={DistanceType.Manhattan}>MANHATTAN</option>
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="newDistanceMatrixName">
							<Form.Label>Nome matrice delle distanze</Form.Label>
							<Form.Control
								required
								type="text"
								value={newDistanceMatrixName}
								onChange={handleChangeNewDistanceMatrixName}
								isInvalid={nameError}
							/>
							<Form.Control.Feedback type="invalid">
              				Nome invalido o già utilizzato.
            			</Form.Control.Feedback>
						</Form.Group>
					</ModalBody>
			
					<ModalFooter>
						<Button variant="secondary" onClick={closeModal}>Torna al menù</Button>
						<Button type="submit" >
							{isLoading? <><Spinner animation="border" size="sm"></Spinner><span>Riduzione in corso...</span></> : <span>Esegui riduzione</span>}
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
			<Alert show={showSuccess} variant="success" className="alert" dismissible onClose={setShowSuccess.bind(null,false)}>
				<Alert.Heading>Operazione completata con successo</Alert.Heading>
				<p>
            La matrice delle distanze è stata calcolata con successo. Puoi ora visualizzarla nei grafici.
				</p>
			</Alert>
			<Alert show={showDanger} variant="danger" className="alert" dismissible onClose={setShowDanger.bind(null,false)}>
				<Alert.Heading>Avviso</Alert.Heading>
				<p>
            Il calcolo della matrice delle distanze è fallito. Controlla di avere un dataset ben formattato.
				</p>
			</Alert> 
		</>
	);
});

export default DistanceCalculation;