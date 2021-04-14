import React, {useEffect} from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../../useInstance";
import { FfChartVM } from "./FfChartVM";

const ForceField = observer(() => {

	//const canvasRef = useRef(null);

	const {
		renderChart,
		color,
		distMin,
		distMax
	} = useInstance(new FfChartVM(useStore()));
	//console.log("renderChart:",renderChart());

	useEffect(() => {renderChart();}, [color, distMax, distMin]);
	
	return(
		<div className="forceField">
			<canvas className="plot" id="ff-canvas"></canvas>
		</div>
	);
});
export default ForceField;