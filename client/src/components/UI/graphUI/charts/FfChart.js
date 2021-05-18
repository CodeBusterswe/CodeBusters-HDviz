/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../../useInstance";
import { FfChartVM } from "./FfChartVM";

const FfChart = observer(() => {

	const {
		renderChart,
		matrix,
		color,
		distMin,
		distMax
	} = useInstance(new FfChartVM(useStore()));

	useEffect(() => {
		renderChart();
	}, [color, distMax, distMin, matrix]);
	
	return(
		<div className="forceField">
			<canvas className="plot" id="ff-canvas"></canvas>
		</div>
	);
});
export default FfChart;