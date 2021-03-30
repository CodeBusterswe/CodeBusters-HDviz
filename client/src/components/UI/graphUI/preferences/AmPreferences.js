import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";

const AdjacencyMatrixPreferences = () => {
	const viewModel = useStore();
	const sorts = viewModel.getCheckedDimensions();
	const matrices = viewModel.getDistanceMatricesNames();
	const [matrixName, order, label, distMax, distMin] = viewModel.getAmPreferences();
	const matrix = viewModel.getDistanceMatricesByName(matrixName);
	const min = matrix ? Math.min.apply(Math, matrix.links.map(link =>link.value)) : undefined;
	const max = matrix ? Math.max.apply(Math,matrix.links.map(link =>link.value)) : undefined;

	function handleSelectChange(e){
		const value = e.target.value==="undefined" ? undefined : e.target.value,
			identifier = e.target.id;
		viewModel.setAmPreferences(identifier, value);
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
			<Form.Group controlId="orderBy">
				<Form.Label>Order by</Form.Label>
				<Form.Control
					custom
					as="select"
					value={order}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noOrder"}>No order</option>
					{sorts.map((d) => {
						return <option value={d} key={d}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="label">
				<Form.Label>Labels</Form.Label>
				<Form.Control
					custom
					as="select"
					value={label}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noLabel"} >No label</option>
					{sorts.map((d) => {
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
export default observer(AdjacencyMatrixPreferences);