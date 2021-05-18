/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../../useInstance";
import { PlmaChartVM } from "./PlmaChartVM";
const PlmaChart = observer(() => {
	const {
		dimensionsNames,
		color,
		renderChart,
		colorChart,
	} = useInstance(new PlmaChartVM(useStore()));
	useEffect(() => {renderChart();}, [dimensionsNames]);
	useEffect(() => { colorChart();}, [color]);
	return(
		<div className="plma">
			<svg className="plot" id="plma-svg">
				<g className="plma-chart"></g>
			</svg>
		</div>
	);
});
export default PlmaChart;