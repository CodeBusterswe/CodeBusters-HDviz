import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../ContextProvider";
import { useInstance } from "../../../../useInstance";
import Modal from "react-bootstrap/Modal";
import { Button, ModalBody, ModalFooter } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {AlgorithmType} from "../../../../utils";
import { DimensionalReductionVM } from "./DimensionalReductionVM";
import Form from "react-bootstrap/Form";

const DimensionalReduction = observer((props) => {
	const {
		modalIsOpen,
		closeModal
	} = props;
	const {
		handleSubmit,
		dimensionsToRedux,
		optionList,
		algorithmType,
		handleChangeDimensionsToRedux,
		handleChangeAlgorithmType,
		newDimensionsName,
		handleChangeNewDimensionsName,
		nameError,
		newDimensionsNumber,
		handleChangeNewDimensionsNumber,
		perplexity,
		handleChangePerplexity,
		epsilon,
		handleChangeEspilon,
		neighbors,
		handleChangeNeighbours

	} = useInstance(new DimensionalReductionVM(useStore(), closeModal));

	function renderParams() {
		switch (algorithmType) {
		case AlgorithmType.tSNE:
			return (
				<>
					<Form.Group>
						<Form.Label>Perplexity</Form.Label>
						<RangeSlider
							tooltip="on"
							value={perplexity}
							onChange={handleChangePerplexity}
							min={20}
							max={200}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Espilon</Form.Label>
						<RangeSlider
							tooltip="on"
							value={epsilon}
							onChange={handleChangeEspilon}
							min={5}
							max={100}
						/>
					</Form.Group>
				</>
			);
		case AlgorithmType.FastMap:
			return null;
		default:
			return (
				<Form.Group>
					<Form.Label>Neighbors</Form.Label>
					<RangeSlider
						tooltip="on"
						value={neighbors}
						onChange={handleChangeNeighbours}
						min={20}
						max={200}
					/>
				</Form.Group>
			);
		}
		
	}

	return (
		<Modal
			show={modalIsOpen}
			onHide={closeModal}
		>
			<Form onSubmit={handleSubmit} noValidate>
				<Modal.Header closeButton>
					<Modal.Title>Riduzione dimensionale</Modal.Title>
				</Modal.Header>

				<ModalBody>
					<Form.Group controlId="dimensionsToReduxList">
						<Form.Label>Select the dimensions to use</Form.Label>
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
					<Form.Group controlId="algorithmType">	
						<Form.Label>Select algorithm</Form.Label>
						<Form.Control 
							as="select" 
							custom 
							value={algorithmType}
							onChange={handleChangeAlgorithmType}>
							<option value={AlgorithmType.FastMap}>FASTMAP</option>
							<option value={AlgorithmType.LLE}>LLE</option>
							<option value={AlgorithmType.IsoMap}>ISOMAP</option>
							<option value={AlgorithmType.tSNE}>TSNE</option>
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="newDimensionsName">
						<Form.Label>New dimensions name</Form.Label>
						<Form.Control
							required
							type="text"
							value={newDimensionsName}
							onChange={handleChangeNewDimensionsName}
							isInvalid={nameError}
						/>
						<Form.Control.Feedback type="invalid">
              				Please choose a different name.
            			</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId="newDimensionsNumber">
						<Form.Label>New dimensions number</Form.Label>
						<RangeSlider
							tooltip="on"
							value={newDimensionsNumber}
							onChange={handleChangeNewDimensionsNumber}
							min={2}
							max={8}
						/>
					</Form.Group>
					{
						renderParams()
					}
				</ModalBody>
			
				<ModalFooter>
					<Button variant="secondary" onClick={closeModal}>Back to menu</Button>
					<Button type="submit">Start reduction</Button>
				</ModalFooter>
			</Form>
		</Modal>
	);
});

export default DimensionalReduction;