import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";

const ForceFieldPreferences = () => {

	const viewModel = useStore();
	const keys = viewModel.getCheckedDimensions();
	const matrices = viewModel.getDistanceMatricesNames();
	const [matrixName, color] = viewModel.getFfPreferences();

	function handleSelectChange(e){
		const value = e.target.value==="undefined" ? undefined : e.target.value,
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
					value={matrixName}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noDistancematrix"}>No distance matrix</option>
					{matrices.map((d) => {
						return <option value={d} key={d}>{d}</option>
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="color">
				<Form.Label>Color</Form.Label>
				<Form.Control
					custom
					as="select"
					value={color}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noColor"}>No color</option>
					{keys.map((d) => {
						return <option value={d} key={d}>{d}</option>
					})}
				</Form.Control>
			</Form.Group>
		</Form>
	)
}
export default observer(ForceFieldPreferences);
