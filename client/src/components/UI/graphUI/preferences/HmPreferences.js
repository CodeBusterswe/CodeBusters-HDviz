import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";

const HeatMapPreferences = () => {
	const viewModel = useStore();
	const keys = viewModel.getCheckedDimensions();
	const values = viewModel.getHmPreferences();
	const labels = ["Axis X", "Axis Y", "Heat"];
	const identifiers = ["xAxis", "yAxis", "heat"];

	function handleSelectChange(e){
		const value = e.target.value !== "null" ? e.target.value : null, 
			identifier = e.target.id;
		viewModel.setHmPreferences(identifier, value);
	}
	return(
		<Form className="chartPreferences">
			{
				identifiers.map((identifiers, index) => {
					return (
						<Form.Group controlId={identifiers}>
							<Form.Label>{labels[index]}</Form.Label>
							<Form.Control
								custom
								as="select"
								value={values[index]}
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
export default observer(HeatMapPreferences);