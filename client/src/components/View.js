import React from 'react'
import {observer} from 'mobx-react-lite'
import BurgerMenu from './UI/burgerMenuUI/BurgerMenu'
import SelectorDimension from './UI/algorithmUI/SelectorDimension'
import "./style.css"
import { useStore } from "../ContextProvider";

const View = observer(() => {
  const viewModel = useStore()
    return (
        <div id="App">
        <BurgerMenu pageWrapId={"page-wrap"} outerContainerId={"App"} width={ '40%' } isOpen={ true }/>
        <main id="page-wrap">
          <h1>all the rest</h1>
          <h2>of the application</h2>
          <SelectorDimension width={ '40%' }/>
        </main>
      </div>
    )
})
export default View