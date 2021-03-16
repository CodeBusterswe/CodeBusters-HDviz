import React from "react"
import Menu from "./UI/burgerMenuUI/Menu"
import "./style.css"
import { useStore } from "../ContextProvider"
import Header from "./UI/headerUI/Header"
import ScatterPlotMatrixDiv from "./UI/graphUI/scatterplot/ScatterPlotMatrixDiv"

const View = () => {
	const viewModel = useStore()
	return (
		<div>
			<Header />
			<Menu />
			<div className="content">
				{viewModel.getShowSPM() ?	<div className="content"><ScatterPlotMatrixDiv></ScatterPlotMatrixDiv></div> : null}
			</div>
			
		</div>
	)
}
export default View