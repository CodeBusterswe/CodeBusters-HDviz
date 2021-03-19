import React from "react"
import { useStore } from "../../../ContextProvider"
import { ScatterPlotMatrix, ForceField, AdjacencyMatrix, HeatMap, Plma } from "./charts"
import { ScatterPlotMatrixPreferences, ForceFieldPreferences, AdjacencyMatrixPreferences, HeatMapPreferences, PlmaPreferences } from "./preferences"
import {observer} from "mobx-react-lite"
import {VisualizationType} from "../../../utils"

function Graph(){
	function renderCharts(){
		switch(viewModel.getChartToShow()){
		case VisualizationType.ScatterPlotMatrix:
			return <><ScatterPlotMatrixPreferences/><ScatterPlotMatrix/></>
		case VisualizationType.AdjacencyMatrix:
			return <><AdjacencyMatrixPreferences/><AdjacencyMatrix/></>
		case VisualizationType.ForceField:
			return <><ForceFieldPreferences/><ForceField/></>
		case VisualizationType.HeatMap:
			return <><HeatMapPreferences/><HeatMap/></>
		case VisualizationType.PLMA:
			return <><PlmaPreferences/><Plma/></>
		default:
			return null;
		}
	}
	const viewModel = useStore()
	return(
		<div className="content">
			{/*<input type="button" value="MOSTRA STATO MODELLO" onClick={ () => {
				console.log("OriginalData:", viewModel.getOriginalData());
				console.log("SelectedData:", viewModel.getSelectedData());
				console.log("Dimensions:", viewModel.getDimensions());
				console.log("Chart:", viewModel.getChartToShow());
			}}/>
			<hr></hr>*/}
			{renderCharts()}
		</div>
	)
}
export default observer(Graph)
