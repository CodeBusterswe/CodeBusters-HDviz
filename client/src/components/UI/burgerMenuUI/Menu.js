/* eslint-disable indent */
import React, { useState } from "react"
import DimensionalReduction from "./ModalContent/DimensionalReduction"
import LoadCSV from "./ModalContent/LoadCSV"
import "../../style.css";
import {AiOutlineArrowRight , AiOutlineDotChart} from "react-icons/ai";
import {ImDatabase} from "react-icons/im";
import {FaFileCsv} from "react-icons/fa";
import {SiGraphcool , SiJson} from "react-icons/si";
import ChooseGraphic from "./ModalContent/ChooseGraphic";
import { useStore } from "../../../ContextProvider"

const Menu = () => { 
	const viewModel = useStore();
	const [modalIsOpen, setIsOpen] = useState(false);
	const [id, setId] = useState(0);
	const names = ["Carica/Salva sessione", "Carica dati dal DB", 
		"Carica dati da CSV", "Riduci dimensioni", "Scegli il grafico"]; 
	const icons = [<SiJson size={32} className="icon"/>, 
		<ImDatabase size={32} className="icon"/>,
		<FaFileCsv size={32} className="icon"/>, 
		<SiGraphcool size={32} className="icon"/>,
		<AiOutlineDotChart size={32} className="icon"/>];

	function openModal(index) {
		setIsOpen(true);
		setId(index);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function handleContent(index) {
		switch (index) {
		case 2:
			return <LoadCSV modalIsOpen={modalIsOpen} closeModal={closeModal}></LoadCSV>
		case 3:
			return <DimensionalReduction modalIsOpen={modalIsOpen} closeModal={closeModal}></DimensionalReduction>
		case 4:
			return <ChooseGraphic modalIsOpen={modalIsOpen} closeModal={closeModal}></ChooseGraphic>
		default:
			break;
		}
	}
								
	return (
		<> 
 			<nav className="navbar">
				<ul className="navbar-nav">
					<li className="logo">
						<p>
							<span className="link-text logo-text">HDViz</span>
							<AiOutlineArrowRight size={40} className="arrow-icon"/>
						</p>
					</li>
					{names.map((name, index) => {
						return(
							<li className="nav-item">
								<button className="nav-link" onClick={() => openModal(index)}>	
									{icons[index]}
									<span className="link-text">{name}</span>
								</button>
							</li>
						)
					})} 
					<li className="nav-item">
						<button className="nav-link" onClick={() => {viewModel.setShowSPM();closeModal()}}>
							{icons[4]}
										<span className="link-text">Scatter Plot Matrix</span></button>
					</li>
				</ul> 
			</nav> 
			{handleContent(id)}
		</>
	)
}
export default Menu
