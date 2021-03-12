import React from 'react'
import {observer} from 'mobx-react-lite'
import BurgerMenu from './UI/burgerMenuUI/BurgerMenu'
import "./style.css"

const View = observer((props) => {
    const{
        
    } = props

    return (
        <div id="App">
        <BurgerMenu
        />
        </div>
    )
})
export default View