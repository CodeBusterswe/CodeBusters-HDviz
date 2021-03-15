import React, { useState } from "react"
import { useStore } from "../../../../ContextProvider"
import Modal from "react-bootstrap/Modal"
import { Button, ModalBody, ModalFooter } from "react-bootstrap"
import RangeSlider from "react-bootstrap-range-slider";
import Select from "react-select"
import makeAnimated from "react-select/animated";
import {AlgorithmType} from "../../../../utils"
import Form from "react-bootstrap/Form"

const DimensionalReduction = props => {
	const viewModel = useStore()
	const [dimensionsToRedux, setDimensionsToRedux] = useState(viewModel.getOptionsForReduxDimensionsList().slice(0,2));
	const [algorithmType, setAlgorithmType] = useState(AlgorithmType.FastMap);	
	const [newDimensionsName, setNewDimensionsName] = useState(AlgorithmType.FastMap);
	const [newDimensionsNumber, setNewDimensionsNumber] = useState(2);
	const [neighbors, setNeighbors] = useState(30);
	const [perplexity, setPerplexity] = useState(50)
	const [epsilon, setEpsilon] = useState(10)
	const [validated, setValidated] = useState(false);
	
	const {
		modalIsOpen,
		closeModal
	} = props

	function handleSubmit(e){
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}else{
			setValidated(true);
			viewModel.beginDimensionalRedux(
				algorithmType, 
				dimensionsToRedux.map(d => d.value),
				{
					Name: newDimensionsName,
					DimensionsNumber: newDimensionsNumber,
					Neighbors: neighbors,
					Perplexity: perplexity,
					Epsilon: epsilon
				});
			e.preventDefault();
			e.stopPropagation();
			closeModal()
		}
	}
	function handleChangeNeighbours(e){
		setNeighbors(e.target.value);
	}
	function handleChangeAlgorithmType(e){
		setNewDimensionsName(e.target.value)
		setAlgorithmType(e.target.value)
		setNeighbors(30)
		setNewDimensionsNumber(2)
		setEpsilon(10)
		setPerplexity(50)
	}
	function handleChangeNewDimensionsName(e){
		setNewDimensionsName(e.target.value)
	}
	function handleChangeNewDimensionsNumber(e){
		setNewDimensionsNumber(e.target.value)
	}
	function handleChangePerplexity(e){
		setPerplexity(e.target.value)
	}
	function handleChangeEspilon(e){
		setEpsilon(e.target.value)
	}
	function handleChangeDimensionsToRedux (value, handler){
		switch(handler.action){
		case "select-option":
			setDimensionsToRedux(value)
			return;
		case "remove-value":
			if(value.length >= 2)
				setDimensionsToRedux(value)
			return;
		case "clear":
			setDimensionsToRedux(dimensionsToRedux.slice(0,2))
			return;
		default:
			return;
		}
	}
	function renderParams() {
		switch (algorithmType) {
		case AlgorithmType.tSNE:
			return (
				<Form.Group>
					<Form.Label>Perplexity</Form.Label>
					<RangeSlider
						value={perplexity}
						onChange={handleChangePerplexity}
						min={20}
						max={200}
					/>
					<Form.Label>Espilon</Form.Label>
					<RangeSlider
						value={epsilon}
						onChange={handleChangeEspilon}
						min={5}
						max={100}
					/>
				</Form.Group>
			);
		case AlgorithmType.FastMap:
			return null;
		default:
			return (
				<Form.Group>
					<Form.Label>Neighbors</Form.Label>
					<RangeSlider
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
		//ariaHideApp={false}
		>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Riduzione dimensionale</Modal.Title>
				</Modal.Header>

				<ModalBody>
					<Form.Group>
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
						<Form.Label>Select algorithm</Form.Label>
						<Form.Control 
							as="select" 
							size="sm" 
							custom 
							onChange={handleChangeAlgorithmType}>
							<option value={AlgorithmType.FastMap}>FASTMAP</option>
							<option value={AlgorithmType.LLE}>LLE</option>
							<option value={AlgorithmType.IsoMap}>ISOMAP</option>
							<option value={AlgorithmType.tSNE}>TSNE</option>
						</Form.Control>
						<Form.Label>New dimensions name</Form.Label>
						<Form.Control
							required
							type="text"
							value={newDimensionsName}
							onChange={handleChangeNewDimensionsName}
						/>
						<Form.Control.Feedback type="invalid">
              				Please choose a name.
            			</Form.Control.Feedback>
						<Form.Label>New dimensions number</Form.Label>
						<RangeSlider
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
					<Button variant="secondary" onClick={closeModal}>Torna al menù</Button>
					<Button type="submit">Applica riduzione</Button>
				</ModalFooter>
			</Form>
		</Modal>
	)
}

export default DimensionalReduction