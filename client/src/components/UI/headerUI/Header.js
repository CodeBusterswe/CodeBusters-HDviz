import React, {useState} from "react";
import logo from "./logo/logo.svg";
import {Button} from "react-bootstrap";
import "../../style.css";
import Guida from "./Guida";

const Header = () => {
	const [modalIsOpen, setIsOpen] = useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<header className="App-header">
				<div className="first"></div>
				<img src={logo} className="App-logo" alt="logo" />
				<h1>HDViz</h1>
				<Button className="last" onClick={openModal}>Guida introduttiva</Button>	
			</header>
			<Guida modalIsOpen={modalIsOpen} closeModal={closeModal}/>
		</>
	);
};
export default Header;
