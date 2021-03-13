import React, { useState } from 'react'
import { slide as Menu } from 'react-burger-menu'
// try scaleRotate at the end (elastic) or slide
import { useStore } from "../../../ContextProvider"
import Modal1 from './Modal1'
import Modal2 from './Modal2'

const BurgerMenu = props => {
  const viewModel = useStore()
  const [modal1IsOpen, set1IsOpen] = useState(false);
  const [modal2IsOpen, set2IsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(true);

  function openModal1() {
    set1IsOpen(true);
    setMenuIsOpen(false);
  }

  function closeModal1() {
    set1IsOpen(false);
    setMenuIsOpen(true);
  }

  function openModal2() {
    set2IsOpen(true);
    setMenuIsOpen(false);
  }

  function closeModal2() {
    set2IsOpen(false);
    setMenuIsOpen(true);
  }

  return (

    <Menu width={'10%'} isOpen={menuIsOpen}>
      <div>
        <button onClick={openModal1}>Carica Dati</button>
        <Modal1
          modal1IsOpen={modal1IsOpen}
          closeModal1={closeModal1}
        />
        <br>
        </br>
        <button onClick={openModal2}>Secondo Modal</button>
        <Modal2
          modal2IsOpen={modal2IsOpen}
          closeModal2={closeModal2}
        />
      </div>
    </Menu>
  )
}

export default BurgerMenu