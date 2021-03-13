import React from 'react'
import Modal from 'react-modal'
import MyCSVReader from './MyCSVReader'

const Modal1 = props => {

    const {
        modal1IsOpen,
        closeModal1
    } = props

    return (

        <Modal
            isOpen={modal1IsOpen}
            onRequestClose={closeModal1}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: '#373a47'
                }
                
            }}
        >

            <button onClick={closeModal1}>close</button>
            BISOGNA DISABILITARE IL TASTO DI POTER APRIRE IL MENU COL MODAL APERTO
            <div>
            <MyCSVReader />
            </div>
        </Modal>

    )
}

export default Modal1