import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";

const ForceFieldPreferences = () => {

	const viewModel = useStore();
	const keys = viewModel.getCheckedDimensions();
	const matrices = viewModel.getDistanceMatricesNames();
	const values = viewModel.getFfPreferences();

	function handleSelectChange(e){
		const value = e.target.value !== "null" ? e.target.value : null,
			identifier = e.target.id;
		viewModel.setFfPreferences(identifier, value);
	}
	return(
		<Form className="chartPreferences">
			<Form.Group controlId="distanceMatrix">
				<Form.Label>Distance Matrix</Form.Label>
				<Form.Control
					custom
					as="select"
					value={values[0]}
					onChange={handleSelectChange}
				>
					<option value={"null"} >No distance matrix</option>
					{matrices.map((d) => {
						return <option value={d}>{d}</option>
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="color">
				<Form.Label>Color</Form.Label>
				<Form.Control
					custom
					as="select"
					value={values[1]}
					onChange={handleSelectChange}
				>
					<option value={"null"} >No color</option>
					{keys.map((d) => {
						return <option value={d}>{d}</option>
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="forceType">
				<Form.Label>Force type</Form.Label>
				<Form.Control
					custom
					as="select"
					value={values[2]}
					onChange={handleSelectChange}
				>
					<option value={"null"} >Default</option>
				</Form.Control>
			</Form.Group>
		</Form>
	)
}
export default observer(ForceFieldPreferences);
