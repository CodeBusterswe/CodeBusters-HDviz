import React from "react"
import { useStore } from "../../../ContextProvider"
import ScatterPlotMatrixDiv from "./scatterplot/ScatterPlotMatrixDiv"
import {observer} from "mobx-react-lite"

const Graph = observer(() => {
	const viewModel = useStore()
	return(
		<div className="content">
			{viewModel.getShowSPM() ?	<div className="content"><ScatterPlotMatrixDiv></ScatterPlotMatrixDiv></div> : null}
		</div>
	)
})
export default Graph
