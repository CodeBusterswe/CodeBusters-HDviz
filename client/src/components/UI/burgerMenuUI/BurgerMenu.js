import React, { useState } from "react"
import "./Menu.css";
import Popup from "./Popup"
import {AiOutlineArrowRight , AiOutlineDotChart} from "react-icons/ai";
import {ImDatabase} from "react-icons/im";
import {FaFileCsv} from "react-icons/fa";
import {SiGraphcool , SiJson} from "react-icons/si";

const Menu = () => { 
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
				</ul> 
			</nav> 
			<Popup
				modalIsOpen={modalIsOpen}
				closeModal={closeModal}
				index={id}
			/>
		</>
	)
}
export default Menu
