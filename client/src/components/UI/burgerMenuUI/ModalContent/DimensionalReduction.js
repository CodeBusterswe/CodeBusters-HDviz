/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../ContextProvider";
import { useInstance } from "../../../../useInstance";
import Modal from "react-bootstrap/Modal";
import { Button, ModalBody, ModalFooter, Spinner, Alert } from "react-bootstrap";
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
		handleChangeNeighbours,
		localConnection,
		handleChangeLocalConnection,
		minDistance,
		handleChangeMinDist,
		setIsLoading,
		isLoading,
		showSuccess,
		setShowSuccess,
		showDanger,
		setShowDanger,
		handleNormalize
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
		case AlgorithmType.UMAP:
			return (
				<>
					<Form.Group>
						<Form.Label>Local connection</Form.Label>
						<RangeSlider
							tooltip="on"
							value={localConnection}
							onChange={handleChangeLocalConnection}
							min={1}
							max={100}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Distanza minima</Form.Label>
						<RangeSlider
							tooltip="on"
							value={minDistance}
							onChange={handleChangeMinDist}
							min={0.05}
							step={0.05}
							max={1.5}
						/>
					</Form.Group>
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

	useEffect(()=>{	
		async function start(){
			await handleSubmit();
		}
		if(isLoading){
			start();
			setIsLoading(false);
			closeModal();
		}
	},[isLoading]);

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
						<Modal.Title>Riduzione dimensionale</Modal.Title>
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
						<Form.Check 
							custom
							type="checkbox"
							key="normalize"
							value="normalize"
							id="normalize"
							label="Normalizza i dati"
							onChange={handleNormalize}
						/>
						<Form.Group controlId="algorithmType" id="alg">	
							<Form.Label>Algoritmo</Form.Label>
							<Form.Control 
								as="select" 
								custom 
								value={algorithmType}
								onChange={handleChangeAlgorithmType}>
								<option value={AlgorithmType.FastMap}>FASTMAP</option>
								<option value={AlgorithmType.LLE}>LLE</option>
								<option value={AlgorithmType.IsoMap}>ISOMAP</option>
								<option value={AlgorithmType.tSNE}>TSNE</option>
								<option value={AlgorithmType.UMAP}>UMAP</option>
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="newDimensionsName">
							<Form.Label>Nome nuove dimensioni</Form.Label>
							<Form.Control
								required
								type="text"
								value={newDimensionsName}
								onChange={handleChangeNewDimensionsName}
								isInvalid={nameError}
							/>
							<Form.Control.Feedback type="invalid">
                            Nome invalido o già utilizzato.
            			</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="newDimensionsNumber">
							<Form.Label>Numero di nuove dimensioni</Form.Label>
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
					La riduzione dimensionale è avvenuta con successo. Puoi ora visualizzare le tue nuove dimensioni.
				</p>
			</Alert>
			<Alert show={showDanger} variant="danger" className="alert" dismissible onClose={setShowDanger.bind(null,false)}>
				<Alert.Heading>Avviso</Alert.Heading>
				<p>
					La riduzione dimensionale è fallita. Controlla di avere un dataset ben formattato.s
				</p>
			</Alert> 
		</>
	);
});

export default DimensionalReduction;
