/* eslint-disable indent */
import React, { useState } from "react"
import { useStore } from "../../../ContextProvider";
import DimensionalReduction from "./ModalContent/DimensionalReduction"
import DistanceCalculation from "./ModalContent/DistanceCalculation"
import LoadCSV from "./ModalContent/LoadCSV"
import "../../style.css";
import {OverlayTrigger , Popover} from "react-bootstrap";
import {AiOutlineArrowRight , AiOutlineDotChart} from "react-icons/ai";
import {ImDatabase} from "react-icons/im";
import {FaFileCsv} from "react-icons/fa";
import { RiMistFill } from "react-icons/ri";
import { IoGrid, IoShareSocialOutline, IoMoveSharp } from "react-icons/io5";
import {SiGraphcool , SiJson} from "react-icons/si";
import LoadDataFromDB from "./ModalContent/LoadDataFromDB"
import { VisualizationType } from "../../../utils";
import useWindowWidth from "./WindowWidth"

const Menu = () => { 
	const [modalIsOpen, setIsOpen] = useState(false);
	const [id, setId] = useState(0);
	const {width} = useWindowWidth();

	const names = ["Carica/Salva sessione", "Carica dati dal DB", 
		"Carica dati da CSV", "Riduci dimensioni", "Calcola distanza", "Scatterplot Matrix",
		"Adjacency Matrix","Heat Map","Force Field","PLMA"]; 
	const icons = [<SiJson size={32} className="icon"/>, 
		<ImDatabase size={32} className="icon"/>,
		<FaFileCsv size={32} className="icon"/>, 
		<SiGraphcool size={32} className="icon"/>,
		<SiGraphcool size={32} className="icon"/>,
		<AiOutlineDotChart size={32} className="icon"/>,
		<IoGrid size={32} className="icon"/>,
		<RiMistFill size={32} className="icon"/>,
		<IoShareSocialOutline size={32} className="icon"/>,
		<IoMoveSharp size={32} className="icon"/>];
	const viewModel = useStore();
	function openModal(index) {
		setIsOpen(true);
		setId(index);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function openGraph(index) {
		switch(index) {
			case 5:
				viewModel.setChartToShow(VisualizationType.ScatterPlotMatrix)
				break;
				//TODO: altri casi per gli altri grafici
				//TODO: togliere che se il bottone è cliccato più volte il grafico compare e scompare (toggle)
			default: break;
		}
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
			return <DistanceCalculation modalIsOpen={modalIsOpen} closeModal={closeModal}></DistanceCalculation>
		default:
			break;
		}
	}
	
	function checkToDisabled(index){
		return index >= 3 && viewModel.getCheckedDimensions().length === 0
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
	//const { innerWidth: width } = window;

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
										<button className="nav-link" disabled aria-disabled="true" style={{ pointerEvents: "none"}}>	
											{icons[index]}
											<span className="link-text">{name}</span>
										</button>	
										</span>
									</OverlayTrigger> : 
									<button className="nav-link" onClick={index < 5 ? () => openModal(index) : () => openGraph(index)}>	
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