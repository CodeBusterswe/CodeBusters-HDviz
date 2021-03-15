/* eslint-disable indent */

import React, {useState} from "react"
import { observer } from "mobx-react-lite"
import BurgerMenu from "./UI/burgerMenuUI/BurgerMenu"
import "./style.css"
import { useStore } from "../ContextProvider"
import Header from "./UI/headerUI/Header"

const View = observer(() => {
	const viewModel = useStore()
	return (
		<div>
			<Header />	
			<BurgerMenu />
		</div>
	)
})
export default View