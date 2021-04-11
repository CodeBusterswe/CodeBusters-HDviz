import React from "react";
import {observer} from "mobx-react-lite";
import { useStore } from "../../../ContextProvider";
import { GraphVM } from "./GraphVM";
import { useInstance } from "../../../useInstance";
import {Button} from "react-bootstrap";

const Graph = observer( () => {

	const {
		btnContent,
		renderCharts,
		renderPreferences,
		handlePref,
		show
	} = useInstance(new GraphVM(useStore()));

	return(
		<div className="content">
			<div className="container-pref">
				<>
					<Button className="btn-pref" onClick={handlePref}>{btnContent()}</Button>
					<div className={show ? "show-pref" : "hide-pref"}>
						{renderPreferences()}
					</div>	
				</>
			</div>
			<div className={show ? null : "center-graph"}>
				{renderCharts()}
			</div>
		</div>
	);
});
export default observer(Graph);
