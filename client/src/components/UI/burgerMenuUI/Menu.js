import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../ContextProvider";
import DimensionalReduction from "./ModalContent/DimensionalReduction";
import DistanceCalculation from "./ModalContent/DistanceCalculation";
import LoadCsv from "./ModalContent/LoadCsv";
import "../../style.css";
import {OverlayTrigger , Popover} from "react-bootstrap";
import {AiOutlineArrowRight} from "react-icons/ai";
import LoadDataFromDB from "./ModalContent/LoadDataFromDB";
import Session from "./ModalContent/Session";
//import useWindowWidth from "./WindowWidth";
import { MenuVM } from "./MenuVM";
import { useInstance } from "../../../useInstance";

const Menu = observer(() => { 
	const {
		modalIsOpen,
		id,
		names,
		icons,
		closeModal,
		openModal,
		showChart,
		isDataLoaded,
		checkToDisabled,
	} = useInstance(new MenuVM(useStore()));
	
	//const {width} = useWindowWidth();

	function handleContent(index) {
		switch (index) {
		case 0:
			return <Session modalIsOpen={modalIsOpen} closeModal={closeModal.bind(null)}/>;
		case 1:
		  return <LoadDataFromDB modalIsOpen={modalIsOpen} closeModal={closeModal.bind(null)}/>;
		case 2:
			return <LoadCsv modalIsOpen={modalIsOpen} closeModal={closeModal.bind(null)}/>;
		case 3:
			return <DimensionalReduction modalIsOpen={modalIsOpen} closeModal={closeModal.bind(null)}/>;
		case 4:
			return <DistanceCalculation modalIsOpen={modalIsOpen} closeModal={closeModal.bind(null)}/>;
		default:
			break;
		}

	}
	const popover = 
		<Popover id="popover-basic">
			<Popover.Title as="h3">Voce disabilitata</Popover.Title>
			<Popover.Content>
				{isDataLoaded ? 
					"Prima devi aver caricato i dati e selezionato almeno due dimensioni" :
				 	"Prima devi aver calcolato una matrice delle distanze"}
			</Popover.Content>
		</Popover>;

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
										//placement={width > 600 ? "right" : "top"} 
										placement = "right"
										delay={{ show: 200, hide: 0 }}>
										<span className="d-inline-block" style={{ width: "100%" }} > 
											<button className="nav-link" disabled aria-disabled="true" style={{ pointerEvents: "none"}}>	
												{icons[index]}
												<span className="link-text">{name}</span>
											</button>	
										</span>
									</OverlayTrigger> : 
									<button className="nav-link" onClick={index < 5 ? openModal.bind(null, index) : showChart.bind(null, index)}>	
										{icons[index]}
										<span className="link-text">{name}</span>
									</button>
								}	
							</li> 
						);
					})} 
				</ul> 
			</nav> 
			{handleContent(id)}
		</>
	);
});

export default Menu;