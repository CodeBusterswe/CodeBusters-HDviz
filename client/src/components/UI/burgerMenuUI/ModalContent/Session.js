import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../ContextProvider";
import { useInstance } from "../../../../useInstance";
import { ModalBody, ModalFooter ,Alert , Modal, Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {SessionVM} from "./SessionVM";
import MyDropzone from "./MyDropzone";
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
		fileName,
		setShowDanger,
		handleExport,
		loadSession,
		handleDismiss,
		handleChangeFileName,
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
					<ModalBody id="dropzone-modal-body">
						<MyDropzone loadSession={loadSession} />
						<hr/>
						<p>In alternativa, esporta la tua sessione di lavoro specificando il nome e premendo il tasto dedicato:</p>
						<Form.Control
							id="input-session"
							required
							type="text"
							value={fileName}
							onChange={handleChangeFileName}
						/>
						<Button id="export-btn" variant="info" onClick={handleExport}>Esporta</Button>
					</ModalBody>
				</ModalBody>
				
				<ModalFooter>
					<Button variant="secondary" onClick={handleDismiss}>Torna al menù</Button>
				</ModalFooter>
			</Modal>
			<Alert show={showSuccess} variant="success" className="alert" dismissible onClose={setShowSuccess.bind(null,false)}>
				<Alert.Heading>Sessione ripristinata correttamente</Alert.Heading>
				<p>
					Ora puoi continuare con il tuo lavoro.
				</p>
			</Alert>
			<Alert show={showDanger} variant="danger" className="alert" dismissible onClose={setShowDanger.bind(null,false)}>
				<Alert.Heading>Avviso</Alert.Heading>
				<p>
					La sessione non è stata ripristinata. Assicurati di aver inserito un file ben formattato.
				</p>
			</Alert> 
		</>
	);
});
export default Session;