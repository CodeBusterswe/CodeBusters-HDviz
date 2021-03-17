import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
//import {SpmAxisType} from "../../../../utils"

const ScatterPlotMatrixPreferences = () => {
	const viewModel = useStore();
	const axis = viewModel.getSpmPreferences();
	const keys = viewModel.getCheckedDimensions();
	const labels = ["Axis one", "Axis two", "Axis Three", "Axis Four", "Axis Five", "Color"];
	const identifiers = ["axis1", "axis2", "axis3", "axis4", "axis5", "color"];

	//Funzione che non permette di selezionare più volte la stessa dimensione
	function handleSelectChange(e){
		const identifier = e.target.id, value = e.target.value;
		if(value === "null")
			viewModel.setSpmAxis(identifier, null)
		else
			viewModel.setSpmAxis(identifier, value)
	}

	return (
		<Form className="chartPreferences">
			{
				identifiers.map((identifiers, index) => {
					return (
						<Form.Group controlId={identifiers}>
							<Form.Label>{labels[index]}</Form.Label>
							<Form.Control
								custom
								as="select"
								value={axis[identifiers]}
								onChange={handleSelectChange}
							>
								<option value={"null"} >No dimension</option>
								{keys.map((d) => {
									return <option value={d}>{d}</option>
								})}
							</Form.Control>
						</Form.Group>
					)
				})
			}
		</Form>
	)
}
export default observer(ScatterPlotMatrixPreferences);