import React, {useEffect} from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../../useInstance";
import { SpmChartVM } from "./SpmChartVM";

const ScatterPlotMatrix = observer(() => {

	const {
		renderChart,
		color
	} = useInstance(new SpmChartVM(useStore()));
    
	//useEffect(() => {console.log("hey"); renderChart();});
	
	return (
		<div className="scatterplotmatrix"><p>{color}</p></div>
	);
});
export default ScatterPlotMatrix;