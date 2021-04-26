import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../ContextProvider";
import { useInstance } from "../../../../useInstance";
import Modal from "react-bootstrap/Modal";
import { Button, ModalBody, ModalFooter } from "react-bootstrap";
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
	}= useInstance(new DistanceCalculationVM(useStore(), closeModal));

	return (
		<Modal
			show={modalIsOpen}
			onHide={closeModal}
		>
			<Form onSubmit={handleSubmit} noValidate>
				<Modal.Header closeButton>
					<Modal.Title>Riduzione dimensionale tramite calcolo delle distanze</Modal.Title>
				</Modal.Header>
				<ModalBody>
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
					<Button type="submit">Esegui riduzione</Button>
				</ModalFooter>
			</Form>
		</Modal>
	);
});

export default DistanceCalculation;