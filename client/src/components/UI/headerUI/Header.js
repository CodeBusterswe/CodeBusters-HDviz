import React, {useEffect} from "react";
import logo from "./logo/logo.svg";
import {Button, Alert} from "react-bootstrap";
import "../../style.css";
import Guida from "./Guida";
import { useInstance } from "../../../useInstance";
import { HeaderVM } from "./HeaderVM";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";

const Header = observer(() => {
	const {
		modalIsOpen,
		openModal,
		closeModal,
		showSuccess,
		showDanger,
		setShowSuccess,
		setShowDanger,
		loadDefaultDataset,
	} = useInstance(new HeaderVM(useStore()));

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
			<header className="App-header">
				<div className="first"></div>
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="mr-auto">HDViz</h1>
				<div className="last mr-3">
					<Button className="mr-2" variant="success" onClick={loadDefaultDataset}>Carica un dataset di prova</Button>
					<Button onClick={openModal}>Guida introduttiva</Button>
				</div>
			</header>
			<Guida modalIsOpen={modalIsOpen} closeModal={closeModal}/>
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
export default Header;
