import React, {useEffect} from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../../useInstance";
import { SpmChartVM } from "./SpmChartVM";

const ScatterPlotMatrix = observer(() => {

	const {
		renderChart,
	} = useInstance(new SpmChartVM(useStore()));
    
	useEffect(() => {renderChart();});
	
	return (
		<div className="scatterplotmatrix">
			<svg className="plot" id="spm-svg"><g></g></svg>
			<canvas className="plot" id="spm-canvas"></canvas>
		</div>
	);
});
export default ScatterPlotMatrix;