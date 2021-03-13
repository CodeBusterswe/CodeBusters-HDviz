import React from 'react'
import Modal from 'react-modal'
import MyCSVReader from './MyCSVReader'
import DimList from './DimList'

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
            <div>
                <MyCSVReader />
                qui poi ci stanno le dimList
                <DimList />
                <button onClick={closeModal1}>Torna al menù</button>
            </div>
        </Modal>
            
            )
        }

export default Modal1