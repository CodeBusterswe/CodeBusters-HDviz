import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";

const AdjacencyMatrixPreferences = () => {
	const viewModel = useStore();
	const sorts = viewModel.getCheckedDimensions();
	const matrices = viewModel.getDistanceMatricesNames();
	const [matrixName, order, label] = viewModel.getAmPreferences();

	function handleSelectMatrixChange(e){
		const value = e.target.value==="undefined" ? undefined : e.target.value,
			identifier = e.target.id;
		viewModel.setAmPreferences(identifier, value);
	}
	function handleSelectOrderChange(e){
		const value = e.target.value==="undefined" ? undefined : e.target.value,
			identifier = e.target.id;
		if(value === "cluster"){
			console.log("sort by cluster")
			//CI penseremo
		}else{
			viewModel.setAmPreferences(identifier, value);
		}
	}
	function handleSelectLabelChange(e){
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
					onChange={handleSelectMatrixChange}
				>
					<option value={"undefined"} key={"noDistancematrix"}>No distance matrix</option>
					{matrices.map((d) => {
						return <option value={d} key={d}>{d}</option>
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="orderBy">
				<Form.Label>Order by</Form.Label>
				<Form.Control
					custom
					as="select"
					value={order}
					onChange={handleSelectOrderChange}
				>
					<option value={"undefined"} key={"noOrder"}>No order</option>
					<option value={"cluster"} key={"cluster"}>Cluster</option>
					{sorts.map((d) => {
						return <option value={d} key={d}>{d}</option>
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="label">
				<Form.Label>Labels</Form.Label>
				<Form.Control
					custom
					as="select"
					value={label}
					onChange={handleSelectLabelChange}
				>
					<option value={undefined} key={"noLabel"} >No label</option>
					{sorts.map((d) => {
						return <option value={d} key={d}>{d}</option>
					})}
				</Form.Control>
			</Form.Group>
		</Form>
	)
}
export default observer(AdjacencyMatrixPreferences);