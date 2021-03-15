/* eslint-disable indent */

import React, {useState} from "react"
import { observer } from "mobx-react-lite"
import BurgerMenu from "./UI/burgerMenuUI/BurgerMenu"
import "./style.css"
import { useStore } from "../ContextProvider"
import Header from "./UI/headerUI/Header"
import ScatterPlotMatrixDiv from "./UI/graphUI/scatterplot/ScatterPlotMatrixDiv"

const View = observer(() => {
	const viewModel = useStore()
	return (
		<div>
			<Header />
{/* 			<button className="mb-3 btn-lg btn-block" onClick={() => viewModel.setShowSPM()}>Prova MOSTRA grafico</button>
			{viewModel.getShowSPM() ?	<div><ScatterPlotMatrixDiv></ScatterPlotMatrixDiv></div> : null} */}
			<BurgerMenu />
		</div>
	)
})
export default View