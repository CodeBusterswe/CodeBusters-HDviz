import React from 'react'
import Modal from 'react-modal'

const Modal2 = props => {

    const {
        modal2IsOpen,
        closeModal2
    } = props

    return (

        <Modal
            isOpen={modal2IsOpen}
            onRequestClose={closeModal2}
            style={{
                overlay: {
                    backgroundColor: '#373a47'
                },
                content: {
                    left: '5%'
                }
            }}
        >

            <button onClick={closeModal2}>close</button>
            <div>I am a modal</div>
        </Modal>

    )
}

export default Modal2