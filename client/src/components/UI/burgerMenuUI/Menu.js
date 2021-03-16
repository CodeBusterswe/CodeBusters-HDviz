/* eslint-disable indent */
import React, { useState } from "react"
import DimensionalReduction from "./ModalContent/DimensionalReduction"
import LoadCSV from "./ModalContent/LoadCSV"
import "../../style.css";
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
//import {observer} from "mobx-react-lite"
import { toJS } from "mobx"
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
	const [visible, setVisible] = useState(false);

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
	
	function checkToDisabled(index){
		return (index === 3 || index === 4) && toJS(viewModel.getOriginalData()).length === 0;
	}

	function toggleTippy() {
		setVisible(!visible);
	}

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
							<>
								{checkToDisabled(index) ?								 
								<Tippy content="Carica i dati Gregorio!!"
									interactive={true}
									offset={[100,5]}
									placement={"bottom"}
									duration={100}
									delay={[200, 0]}>
										<li className="nav-item" key={name}>
											<button className="nav-link" onClick={() => openModal(index)} disabled>	
												{icons[index]}
												<span className="link-text">{name}</span>
											</button>	
									</li> 
								</Tippy> : 
								<li className="nav-item" key={name}>
									<button className="nav-link" onClick={() => openModal(index)}>	
										{icons[index]}
										<span className="link-text">{name}</span>
									</button>
								</li> }	
							</>
						)
					})} 
				</ul> 
			</nav> 
			{handleContent(id)}
		</>
	)
}

export default Menu
