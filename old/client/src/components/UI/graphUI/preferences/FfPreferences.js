import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";

const ForceFieldPreferences = () => {

	const viewModel = useStore();
	const keys = viewModel.getCheckedDimensions();
	const matrices = viewModel.getDistanceMatricesNames();
	const [matrixName, color, distMax, distMin] = viewModel.getFfPreferences();
	const matrix = viewModel.getDistanceMatricesByName(matrixName);
	const min = matrix ? Math.min.apply(Math, matrix.links.map(link =>link.value)) : undefined;
	const max = matrix ? Math.max.apply(Math,matrix.links.map(link =>link.value)) : undefined;
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
						return <option value={d} key={d}>{d}</option>;
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
					<option value={"group"} key={"group"}>Group</option>
					{keys.map((d) => {
						return <option value={d} key={d}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="distMax">
				<Form.Label>Max Distance: {max}</Form.Label>
				<Form.Control
					as="input"
					value={distMax}
					defaultValue={1000}
					onChange={handleSelectChange}
				>
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="distMin">
				<Form.Label>MinDistance: {min}</Form.Label>
				<Form.Control
					as="input"
					value={distMin}
					defaultValue={0}
					onChange={handleSelectChange}
				>
				</Form.Control>
			</Form.Group>
		</Form>
	);
};
export default observer(ForceFieldPreferences);
