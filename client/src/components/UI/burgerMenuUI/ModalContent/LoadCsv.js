import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import MyCSVReader from "./MyCSVReader";
import DimensionsList from "./DimensionsList";
import { useStore } from "../../../../ContextProvider";
import { useInstance } from "../../../../useInstance";
import { ModalBody, ModalFooter ,Alert , Modal, Button} from "react-bootstrap";
import {LoadCsvVM} from "./LoadCsvVM";
import "../../../style.css";

const LoadCsv = observer((props) => {
	const {
		modalIsOpen,
		closeModal
	} = props;
	const {
		localDimensions,
		showSuccess,
		setShowSuccess,
		showDanger,
		setShowDanger,
		setLocalStates,
		selectAllDimensions,
		selectDimension,
		handleConfirm,
		handleDismiss,
	} = useInstance(new LoadCsvVM(useStore(), closeModal));

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
		<>
			<Modal
				show={modalIsOpen}
				onHide={handleDismiss}
			>
				<Modal.Header closeButton>
					<Modal.Title>Carica i dati</Modal.Title>
				</Modal.Header>

				<ModalBody>
					<div>
						<MyCSVReader setLocalStates={setLocalStates.bind(null)}/>
						<DimensionsList dimensions={localDimensions} selectAllDimensions={selectAllDimensions.bind(null)} 
							selectDimension={selectDimension.bind(null)}/>
					</div>
				</ModalBody>
				
				<ModalFooter>
					<Button variant="secondary" onClick={handleDismiss}>Torna al menù</Button>
					<Button variant="primary" onClick={handleConfirm}>Conferma selezione</Button>
				</ModalFooter>
			</Modal>
			<Alert show={showSuccess} variant="success" className="alert" dismissible onClose={setShowSuccess.bind(null,false)}>
				<Alert.Heading>Dati inseriti correttamente</Alert.Heading>
				<p>
					Ora puoi applicare una riduzione dimensionale ai tuoi dati o scegliere subito la visualizzazione che più preferisci
				</p>
			</Alert>
			<Alert show={showDanger} variant="danger" className="alert" dismissible onClose={setShowDanger.bind(null,false)}>
				<Alert.Heading>Avviso</Alert.Heading>
				<p>
					Nessun dato è stato caricato. Assicurati di aver inserito il file e premuto il tasto "<strong>Conferma selezione</strong>"
				</p>
			</Alert> 
		</>
	);
});

export default LoadCsv;
