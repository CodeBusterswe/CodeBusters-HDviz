/* eslint-disable indent */

import React, {useState} from "react"
import { observer } from "mobx-react-lite"
import Menu from "./UI/burgerMenuUI/Menu"
import "./style.css"
import { useStore } from "../ContextProvider"
import Header from "./UI/headerUI/Header"
import ScatterPlotMatrixDiv from "./UI/graphUI/scatterplot/ScatterPlotMatrixDiv"

const View = observer(() => {
	const viewModel = useStore()
	return (
		<div>
			<Header />
			<Menu />
			{viewModel.getShowSPM() ?	<div><ScatterPlotMatrixDiv></ScatterPlotMatrixDiv></div> : null}
		</div>
	)
})
export default View