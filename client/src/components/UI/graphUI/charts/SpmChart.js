/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../../useInstance";
import { SpmChartVM } from "./SpmChartVM";

const SpmChart = observer(() => {

	const {
		renderChart,
		color,
		traits
	} = useInstance(new SpmChartVM(useStore()));
    
	useEffect(() => {renderChart();}, [color, traits]);
	
	return (
		<div className="scatterplotmatrix">
			<svg className="plot" id="spm-svg"><g></g></svg>
			<svg className="plot" id="spm-cell"><g></g></svg>
			<canvas className="plot" id="spm-canvas"></canvas>
		</div>
	);
});
export default SpmChart;