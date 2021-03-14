import React, { useState } from "react"
import { slide as Menu } from "react-burger-menu"
import { Button } from "react-bootstrap";
import Popup from "./Popup"

function BurgerMenu(){
	const [modalIsOpen, setIsOpen] = useState(false);
	const [menuIsOpen, setMenuIsOpen] = useState(true);
	const [id, setId] = useState(0);
	const names = [ "Carica Dati","Applica riduzione dimensionale","Applica distanza","Scelgi il grafico"];

	function openModal(index) {
		setIsOpen(true);
		setMenuIsOpen(false);
		setId(index);
	}

	function closeModal() {
		setIsOpen(false);
		setMenuIsOpen(true);
	}

	return (
		<Menu width={"15%"} isOpen={menuIsOpen} noTransition>
			<div>
				<div className="button-list">
					{names.map((name, index) => {
						return <Button className="mb-3 btn-lg btn-block" onClick={() => openModal(index)}>{name}</Button>
					})}				
				</div>
				<Popup
					modalIsOpen={modalIsOpen}
					closeModal={closeModal}
					index={id}
				/> 
			</div>
		</Menu>
	)
}

export default BurgerMenu