import React, {useEffect} from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../../useInstance";
import { AmChartVM } from "./AmChartVM";

const AdjacencyMatrix = observer(() => {

	const {
		renderChart,
		matrix,
		orderBy,
		distMin,
		distMax,
		label,
	} = useInstance(new AmChartVM(useStore()));
	
	useEffect(() => {
		renderChart();
	}, [matrix, orderBy, distMin, distMax, label]);

	return (
		<div className="adjacencyMatrix">
			<svg className="plot" id="am-svg"></svg>
			<canvas className="plot" id="am-canvas"></canvas>
		</div>
	);
});
export default AdjacencyMatrix;