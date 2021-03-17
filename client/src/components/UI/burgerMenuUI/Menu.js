/* eslint-disable indent */
import React, { useState } from "react"
import { useStore } from "../../../ContextProvider";
import DimensionalReduction from "./ModalContent/DimensionalReduction"
import LoadCSV from "./ModalContent/LoadCSV"
import ChooseGraphic from "./ModalContent/ChooseGraphic";
import "../../style.css";
import {OverlayTrigger , Popover} from "react-bootstrap";
import {AiOutlineArrowRight , AiOutlineDotChart} from "react-icons/ai";
import {ImDatabase} from "react-icons/im";
import {FaFileCsv} from "react-icons/fa";
import {SiGraphcool , SiJson} from "react-icons/si";
import LoadDataFromDB from "./ModalContent/LoadDataFromDB"
//import useWindowWidth from "./WindowWidth"

const Menu = () => { 
	const [modalIsOpen, setIsOpen] = useState(false);
	const [id, setId] = useState(0);
	//const {width} = useWindowWidth();

	const names = ["Carica/Salva sessione", "Carica dati dal DB", 
		"Carica dati da CSV", "Riduci dimensioni", "Scegli il grafico"]; 
	const icons = [<SiJson size={32} className="icon"/>, 
		<ImDatabase size={32} className="icon"/>,
		<FaFileCsv size={32} className="icon"/>, 
		<SiGraphcool size={32} className="icon"/>,
		<AiOutlineDotChart size={32} className="icon"/>];
	const viewModel = useStore();
	function openModal(index) {
		setIsOpen(true);
		setId(index);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function handleContent(index) {
		switch (index) {
		case 1: 
		    return <LoadDataFromDB modalIsOpen={modalIsOpen} closeModal={closeModal}/>
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
	
	function checkToDisabled(index){
		return (index === 3 || index === 4) && viewModel.getCheckedDimensions().length === 0
	}

	const popover = 
		<Popover id="popover-basic">
			<Popover.Title as="h3">Voce disabilitata</Popover.Title>
			<Popover.Content>
					Prima devi aver caricato i dati
			</Popover.Content>
		</Popover>

	//? CON QUESTA IL POPOVER CAMBIA POSIZIONE A TOP SOLO IN UNA NUOVA SESSIONE
	//? RICEVE LA WIDTH SOLO APPENA INIZIATA LA SESSIONE (quindi non cambia il valore se si ridimensiona la pagina)
	const { innerWidth: width } = window;

	return (
		<> 
 			<nav className="navbar">
				<ul className="navbar-nav">
					<li className="logo">
						<p>
							<span className="link-text logo-text">HDViz</span>
							<AiOutlineArrowRight size={32} className="arrow-icon"/>
						</p>
					</li>
					{names.map((name, index) => {
						return(
							<li className="nav-item" key={name}>
								{checkToDisabled(index) ?		
									<OverlayTrigger 
										overlay={popover} 
										placement={width > 600 ? "right" : "top"} 
										delay={{ show: 200, hide: 0 }}>
										<span className="d-inline-block" style={{ width: "100%" }} > 
										<button className="nav-link" onClick={() => openModal(index)} disabled aria-disabled="true" style={{ pointerEvents: "none"}}>	
											{icons[index]}
											<span className="link-text">{name}</span>
										</button>	
										</span>
									</OverlayTrigger> : 
									<button className="nav-link" onClick={() => openModal(index)}>	
										{icons[index]}
										<span className="link-text">{name}</span>
									</button>
								}	
							</li> 
						)
					})} 
				</ul> 
			</nav> 
			{handleContent(id)}
		</>
	)
}

export default Menu