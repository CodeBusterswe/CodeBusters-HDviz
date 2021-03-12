import React from 'react'
import { bubble as Menu } from 'react-burger-menu'

const BurgerMenu = props => {

    return (
<Menu {...props}>

      <a className="menu-item" href="/burgers">
        Burgerssssssssssss
      </a>

      <a className="menu-item" href="/pizzas">
        Pizzas
      </a>

      <a className="menu-item" href="/desserts">
        Desserts
      </a>
    </Menu>
    )
  }

  export default BurgerMenu