/* eslint-disable indent */

import React, {useState} from "react"
import { observer } from "mobx-react-lite"
import Menu from "./UI/burgerMenuUI/Menu"
import "./style.css"
import { useStore } from "../ContextProvider"
import Header from "./UI/headerUI/Header"

const View = observer(() => {
	const viewModel = useStore()
	return (
		<div>
			<Header />
			<Menu />
			<div className="content">
				<button className="mb-3 btn-lg btn-block" onClick={() => viewModel.setShowSPM()}>Prova MOSTRA grafico</button>
				{viewModel.getShowSPM() ?	<div><ScatterPlotMatrixDiv></ScatterPlotMatrixDiv></div> : null}	
			</div>
		</div>
	)
})
export default View