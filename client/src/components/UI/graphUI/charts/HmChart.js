import React, {useEffect} from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../../useInstance";
import { HmChartVM } from "./HmChartVM";

const HeatMap = observer(() => {

	const {
		renderChart,
	} = useInstance(new HmChartVM(useStore()));
    
	useEffect(() => {renderChart();});

	return (
		<div className="heatmap">
		</div>
	);

});
export default HeatMap;