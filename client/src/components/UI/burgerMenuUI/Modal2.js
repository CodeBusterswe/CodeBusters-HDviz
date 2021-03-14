
import React from 'react'
import Modal from 'react-modal'
import DimensionalReduction from './DimensionalReduction'


const Modal2 = props => {

	const {
		modal2IsOpen,
		closeModal2
	} = props

	return (

		<Modal
			isOpen={modal2IsOpen}
			onRequestClose={closeModal2}
			ariaHideApp={false}
		>


            <button onClick={closeModal2}>close</button>
            <DimensionalReduction></DimensionalReduction>
        </Modal>


	)
}

export default Modal2