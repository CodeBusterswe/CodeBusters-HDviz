import React from "react"
import Modal from "react-bootstrap/Modal"
import { Button, ModalBody, ModalFooter } from "react-bootstrap"
import DimensionalReduction from "./ModalContent/DimensionalReduction"
import LoadCSV from "./ModalContent/LoadCSV"
import "../../style.css"

const Popup = props => {
	const {
		modalIsOpen,
		closeModal,
		index
	} = props

	function handleContent(index) {
		switch (index) {
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
			show={modalIsOpen}
			onHide={closeModal}
		//ariaHideApp={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<ModalBody>
				{handleContent(index)}
				<Button variant="danger" onClick={closeModal}>Torna al menù</Button>
			</ModalBody>
			<ModalFooter>
				<Button variant="secondary" onClick={closeModal}>
            Close
				</Button>
				<Button variant="primary" onClick={closeModal}>
            Save Changes
				</Button>
			</ModalFooter>
		</Modal>

	)
}

export default Popup