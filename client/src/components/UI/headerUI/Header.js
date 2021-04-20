import React from "react";
import logo from "./logo/logo.svg";
import {Button} from "react-bootstrap";
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
		loadDefaultDataset,
	} = useInstance(new HeaderVM(useStore()));
	
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
		</>
	);
});
export default Header;
