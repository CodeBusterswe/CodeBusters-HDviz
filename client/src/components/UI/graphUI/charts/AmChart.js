import React, {useEffect} from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../../useInstance";
import { AmChartVM } from "./AmChartVM";

const AdjacencyMatrix = observer(() => {

	const {
		renderChart,
	} = useInstance(new AmChartVM(useStore()));
	
	useEffect(() => {renderChart();});

	return (
		<div className="adjacencyMatrix">
		</div>
	);
});
export default AdjacencyMatrix;