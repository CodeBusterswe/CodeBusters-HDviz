import React from "react"
import DimensionalReduction from "./ModalContent/DimensionalReduction"
import LoadCSV from "./ModalContent/LoadCSV"
import "../../style.css"
import ChooseGraphic from "./ModalContent/ChooseGraphic"

const Popup = props => {
	const {
		modalIsOpen,
		closeModal,
		index
	} = props

	function handleContent(index) {
		switch (index) {
		case 2:
			return <LoadCSV modalIsOpen={modalIsOpen} closeModal={closeModal}/>
		case 3:
			return <DimensionalReduction modalIsOpen={modalIsOpen} closeModal={closeModal}/>
		case 4:
			return <ChooseGraphic modalIsOpen={modalIsOpen} closeModal={closeModal}/>
		default:
			break;
		}
	}
	return (
		<div>
			{handleContent(index)}
		</div>
	)
}

export default Popup