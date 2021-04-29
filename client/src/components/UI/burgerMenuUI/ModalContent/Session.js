import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../ContextProvider";
import { useInstance } from "../../../../useInstance";
import { ModalBody, ModalFooter ,Alert , Modal, Button} from "react-bootstrap";
import {SessionVM} from "./SessionVM";
import "../../../style.css";

const Session = observer((props) => {
	const {
		modalIsOpen,
		closeModal
	} = props;
	const {
		showSuccess,
		setShowSuccess,
		showDanger,
		setShowDanger,
		handleConfirm,
		handleDismiss,
	} = useInstance(new SessionVM(useStore(), closeModal));

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
					<Modal.Title>Carica/Esporta sessione</Modal.Title>
				</Modal.Header>

				<ModalBody>
					<button>Prova</button>
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
export default Session;