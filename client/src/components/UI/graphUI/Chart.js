import React from "react";
import {observer} from "mobx-react-lite";
import { useStore } from "../../../ContextProvider";
import { ChartVM } from "./ChartVM";
import { useInstance } from "../../../useInstance";
import {Button} from "react-bootstrap";
import {VisualizationType} from "../../../utils";
import { ScatterPlotMatrix, ForceField, AdjacencyMatrix, HeatMap, Plma } from "./charts";
import { ScatterPlotMatrixPreferences, ForceFieldPreferences, AdjacencyMatrixPreferences, HeatMapPreferences, PlmaPreferences } from "./preferences";

const Chart = observer( () => {

	const {
		handlePref,
		showChart,
		chartToShow
	} = useInstance(new ChartVM(useStore()));

	function btnContent(){
		return showChart ? "Nascondi preferenze" : "Mostra preferenze";
	}

	function renderPreferences(){
		switch(chartToShow){
		case VisualizationType.ScatterPlotMatrix:
			return <ScatterPlotMatrixPreferences/>;
		case VisualizationType.AdjacencyMatrix:
			return <AdjacencyMatrixPreferences/>;
		case VisualizationType.ForceField:
			return <ForceFieldPreferences/>;
		case VisualizationType.HeatMap:
			return <HeatMapPreferences/>;
		case VisualizationType.PLMA:
			return <PlmaPreferences/>;
		default:
			return null;
		}
	}	

	function renderCharts(){
		switch(chartToShow){
		case VisualizationType.ScatterPlotMatrix:
			return <ScatterPlotMatrix/>;
		case VisualizationType.AdjacencyMatrix:
			return <AdjacencyMatrix/>;
		case VisualizationType.ForceField:
			return <ForceField/>;
		case VisualizationType.HeatMap:
			return <HeatMap/>;
		case VisualizationType.PLMA:
			return <Plma/>;
		default:
			return null;
		}
	}	

	return(
		<div className="content">
			<div className="container-pref">
				<>
					{chartToShow !== undefined ? <Button className="btn-pref" onClick={handlePref.bind(null)}>{btnContent()}</Button> : <></>}				
					<div className={showChart ? "show-pref" : "hide-pref"}>
						{renderPreferences()}
					</div>	
				</>
			</div>
			<div className={showChart ? null : "center-graph"}>
				{renderCharts()}
			</div>
		</div>
	);
});
export default Chart;
