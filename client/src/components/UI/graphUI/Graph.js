import React from "react"
import { useStore } from "../../../ContextProvider"
import ScatterPlotMatrixDiv from "./scatterplot/ScatterPlotMatrixDiv"
import {observer} from "mobx-react-lite"
import {VisualizationType} from "../../../utils"

const Graph = observer(() => {
	function renderCharts(){
		switch(viewModel.getChartToShow()){
		case VisualizationType.ScatterPlotMatrix:
			return <ScatterPlotMatrixDiv/>
		default:
			return null;
		}
	}
	const viewModel = useStore()
	return(
		<div className="content">
			<input type="button" value="MOSTRA STATO MODELLO" onClick={ () => {
				console.log("OriginalData:", viewModel.getOriginalData());
				console.log("SelectedData:", viewModel.getSelectedData());
				console.log("Dimensions:", viewModel.getDimensions());
				console.log("Chart:", viewModel.getChartToShow());
			}}/>
			{renderCharts()}
		</div>
	)
})
export default Graph
