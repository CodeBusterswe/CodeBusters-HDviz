import React from "react"
import { useStore } from "../../../ContextProvider"
import ScatterPlotMatrixPreferences from "./scatterplot/SpmPreferences"
import ScatterPlotMatrix from "./scatterplot/SpmChart"
import {observer} from "mobx-react-lite"
import {VisualizationType} from "../../../utils"

function Graph(){
	function renderCharts(){
		switch(viewModel.getChartToShow()){
		case VisualizationType.ScatterPlotMatrix:
			return <><ScatterPlotMatrixPreferences/><ScatterPlotMatrix/> </>
			
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
			<hr></hr>
			{renderCharts()}
		</div>
	)
}
export default observer(Graph)
