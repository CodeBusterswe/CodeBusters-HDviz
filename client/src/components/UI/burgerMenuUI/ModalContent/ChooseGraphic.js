import React, {useState} from "react";
import {Button} from "react-bootstrap"
import {observer} from "mobx-react-lite"
import { useStore } from "../../../../ContextProvider"
import Modal from "react-bootstrap/Modal"
import { ModalBody, ModalFooter } from "react-bootstrap"
import {VisualizationType} from "../../../../utils"

const ChooseGraphic = observer(props => {
	const viewModel = useStore();
	const {
		modalIsOpen,
		closeModal
	} = props

	return(
		<Modal
			show={modalIsOpen}
			onHide={closeModal}
		>
			<Modal.Header closeButton>
				<Modal.Title>Carica i dati</Modal.Title>
			</Modal.Header>

			<ModalBody>
				<Button onClick={() => {viewModel.setChartToShow(VisualizationType.ScatterPlotMatrix);closeModal()}}>Scatter Plot Matrix</Button>
			</ModalBody>
			
			<ModalFooter>
				<Button variant="secondary" onClick={closeModal}>Torna al menù</Button>
			</ModalFooter>
		</Modal>
	)
})

export default ChooseGraphic
