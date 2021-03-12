import React from 'react'
import {observer} from 'mobx-react-lite'
import BurgerMenu from './UI/burgerMenuUI/BurgerMenu'
import "./style.css"

const View = observer((props) => {
    const{
        
    } = props

    return (
        <div id="App">
        <BurgerMenu pageWrapId={"page-wrap"} outerContainerId={"App"} width={ '40%' } isOpen={ true } />
  
        <main id="page-wrap">
          <h1>all the rest</h1>
          <h2>of the application</h2>
        </main>
      </div>
    )
})
export default View