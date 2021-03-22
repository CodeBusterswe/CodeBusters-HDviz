import React, { useState } from "react";
import { useStore } from "../../../../ContextProvider";
import Modal from "react-bootstrap/Modal";
import { Button, ModalBody, ModalFooter } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {DistanceType} from "../../../../utils";
import Form from "react-bootstrap/Form";

const DistanceCalculation = props => {
	const viewModel = useStore();
	const [dimensionsToRedux, setDimensionsToRedux] = useState(viewModel.getOptionsForReduxDimensionsList().slice(0,2));
	const [distanceType, setDistanceType] = useState(DistanceType.Euclidean);	
	const [newDistanceMatrixName, setNewDistanceMatrixName] = useState(DistanceType.Euclidean);
	const [validated, setValidated] = useState(false);
	
	const {
		modalIsOpen,
		closeModal
	} = props;

	function handleSubmit(e){
		const form = e.currentTarget;
		e.preventDefault();
    	if (form.checkValidity() === true) {
			viewModel.beginReduceDimensionsByDist(distanceType, dimensionsToRedux.map(d => d.value), newDistanceMatrixName);
			closeModal();
			//alert("Distanza calcolata con successo");
		}
		setValidated(true);
	}
	function handleChangeDistanceType(e){
		setNewDistanceMatrixName(e.target.value);
		setDistanceType(e.target.value);
	}
	function handleChangeNewDistanceMatrixName(e){
		setNewDistanceMatrixName(e.target.value);
	}

	function handleChangeDimensionsToRedux (value, handler){
		switch(handler.action){
		case "select-option":
			setDimensionsToRedux(value);
			return;
		case "remove-value":
			if(value.length >= 2)
				setDimensionsToRedux(value);
			return;
		case "clear":
			setDimensionsToRedux(dimensionsToRedux.slice(0,2));
			return;
		default:
			return;
		}
	}

	return (
		<Modal
			show={modalIsOpen}
			onHide={closeModal}
		>
			<Form onSubmit={handleSubmit} noValidate validated={validated}>
				<Modal.Header closeButton>
					<Modal.Title>Riduzione dimensionale tramite calcolo delle distanze</Modal.Title>
				</Modal.Header>

				<ModalBody>
					<Form.Group controlId="dimensionsToReduxList">
						<Form.Label>Select the dimensions to use</Form.Label>
						<Select
							value={dimensionsToRedux}
							options={viewModel.getOptionsForReduxDimensionsList()}
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
						<Form.Label>Select distance type</Form.Label>
						<Form.Control 
							as="select" 
							custom 
							value={distanceType}
							onChange={handleChangeDistanceType}>
							<option value={DistanceType.Euclidean}>EUCLIDEAN</option>
							<option value={DistanceType.Canberra}>CANBERRA</option>
							<option value={DistanceType.Chebyshev}>CHEBYSHEV</option>
							<option value={DistanceType.Manhattan}>MANHATTAN</option>
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="newDistanceMatrixName">
						<Form.Label>Distances matrix name</Form.Label>
						<Form.Control
							required
							type="text"
							value={newDistanceMatrixName}
							onChange={handleChangeNewDistanceMatrixName}
						/>
						<Form.Control.Feedback type="invalid">
              				Please choose a name.
            			</Form.Control.Feedback>
					</Form.Group>
				</ModalBody>
			
				<ModalFooter>
					<Button variant="secondary" onClick={closeModal}>Back to menu</Button>
					<Button type="submit">Start reduction</Button>
				</ModalFooter>
			</Form>
		</Modal>
	);
};

export default DistanceCalculation;