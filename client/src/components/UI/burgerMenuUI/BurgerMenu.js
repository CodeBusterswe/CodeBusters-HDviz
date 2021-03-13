import React from 'react'
import { slide as Menu } from 'react-burger-menu'
// try scaleRotate at the end (elastic) or slide
import MyCSVReader from './MyCSVReader'
import DimList from './DimList'
import { useStore } from "../../../ContextProvider";

const BurgerMenu = props => {
  const viewModel = useStore()
    return (

<Menu width={ '60%' } isOpen={ true }>
      <div>
      <MyCSVReader/>
      <DimList/>
      </div>
    </Menu>
    )
  }

  export default BurgerMenu