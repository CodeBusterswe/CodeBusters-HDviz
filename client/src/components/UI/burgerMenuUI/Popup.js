import React from "react"
import Modal from "react-modal"
import {Button} from "react-bootstrap"
import DimensionalReduction from "./ModalContent/DimensionalReduction"
import LoadCSV from "./ModalContent/LoadCSV"

const Popup = props => {
	const {
		modalIsOpen,
		closeModal,
		index
	} = props

	function handleContent(index){
		switch(index) {
		case 0:
			return <LoadCSV closeModal={closeModal}></LoadCSV>
		case 1: 
			return <DimensionalReduction></DimensionalReduction>
			//TODO: other cases
		default: 
			break;
		}
	}
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			ariaHideApp={false}
		>
  		{handleContent(index)}
			<Button variant="danger" onClick={closeModal}>Torna al menù</Button>
		</Modal>           
	)
}

export default Popup