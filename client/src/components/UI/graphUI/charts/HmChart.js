/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../../useInstance";
import { HmChartVM } from "./HmChartVM";

const HmChart = observer(() => {

	const {
		renderChart,
		rows,
		columns,
		heat
	} = useInstance(new HmChartVM(useStore()));
    
	useEffect(() => {renderChart();}, [rows, columns, heat]);

	return (
		<div className="heatmap">
			<svg className="plot" id="hm-svg">
				<g>
					<g className="axis" id="x-axis"/>
					<g className="axis" id="y-axis"/>
				</g>
			</svg>
		</div>
	);

});
export default HmChart;