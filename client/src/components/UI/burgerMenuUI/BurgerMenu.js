import React from 'react'
import { elastic as Menu } from 'react-burger-menu'
// try scaleRotate at the end (elastic) or slide
import MyCSVReader from './MyCSVReader'
const BurgerMenu = props => {
  const {
  } = props

    return (

<Menu {...props}>
      <div>
      <MyCSVReader/>
      </div>
    </Menu>
    )
  }

  export default BurgerMenu