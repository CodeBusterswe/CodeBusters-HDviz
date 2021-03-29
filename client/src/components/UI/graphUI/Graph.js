import React , {useState} from "react";
import { useStore } from "../../../ContextProvider";
import { ScatterPlotMatrix, ForceField, AdjacencyMatrix, HeatMap, Plma } from "./charts";
import { ScatterPlotMatrixPreferences, ForceFieldPreferences, AdjacencyMatrixPreferences, HeatMapPreferences, PlmaPreferences } from "./preferences";
import {observer} from "mobx-react-lite";
import {VisualizationType} from "../../../utils";
import {Button} from "react-bootstrap";

function Graph(){
	const [show, setShow] = useState(true);
	
	function handlePref() {
		setShow(!show);
	}

	function btnContent(){
		return show ? "Nascondi preferenze" : "Mostra preferenze";
	}

	function renderPreferences(){
		switch(viewModel.getChartToShow()){
		case VisualizationType.ScatterPlotMatrix:
			return (
				<>
					<Button className="btn-pref" onClick={handlePref}>{btnContent()}</Button>
					<div className={show ? "show-pref" : "hide-pref"}>
						<ScatterPlotMatrixPreferences/>
					</div>	
				</>
			);
			
		case VisualizationType.AdjacencyMatrix:
			return (
				<>
					<Button className="btn-pref" onClick={handlePref}>{btnContent()}</Button>
					<div className={show ? "show-pref" : "hide-pref"}>
						<AdjacencyMatrixPreferences/>
					</div>	
				</>
			);
		case VisualizationType.ForceField:
			return (
				<>
					<Button className="btn-pref" onClick={handlePref}>{btnContent()}</Button>
					<div className={show ? "show-pref" : "hide-pref"}>
						<ForceFieldPreferences/>
					</div>	
				</>
			);
		case VisualizationType.HeatMap:
			return (
				<>
					<Button className="btn-pref" onClick={handlePref}>{btnContent()}</Button>
					<div className={show ? "show-pref" : "hide-pref"}>
						<HeatMapPreferences/>
					</div>	
				</>
			);
		case VisualizationType.PLMA:
			return (
				<>
					<Button className="btn-pref" onClick={handlePref}>{btnContent()}</Button>
					<div className={show ? "show-pref" : "hide-pref"}>
						<PlmaPreferences/>
					</div>	
				</>
			);
		default: break;
		}
	}

	function renderCharts(){
		switch(viewModel.getChartToShow()){
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

	const viewModel = useStore();
	return(
		<div className="content">
			{/*<input type="button" value="MOSTRA STATO MODELLO" onClick={ () => {
				console.log("OriginalData:", viewModel.getOriginalData());
				console.log("SelectedData:", viewModel.getSelectedData());
				console.log("Dimensions:", viewModel.getDimensions());
				console.log("Chart:", viewModel.getChartToShow());
			}}/>
			<hr></hr>*/}
			<div className="container-pref">
				{renderPreferences()}
			</div>
			<div className={show ? null : "center-graph"}>
				{renderCharts()}
			</div>
		</div>
	);
}
export default observer(Graph);
