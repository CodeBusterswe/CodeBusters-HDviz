import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";

const AdjacencyMatrixPreferences = () => {
	const viewModel = useStore();
	const sorts = viewModel.getCheckedDimensions();
	const matrices = viewModel.getDistanceMatricesNames();
	const values = viewModel.getAmPreferences();

	function handleSelectMatrixChange(e){
		const value = e.target.value !== "null" ? e.target.value : null,
			identifier = e.target.id;
		viewModel.setAmPreferences(identifier, value);
	}
	function handleSelectOrderChange(e){
		const value = e.target.value !== "null" ? e.target.value : null,
			identifier = e.target.id;
		if(value === "cluster"){
			console.log("sort by cluster")
			//CI penseremo
		}else{
			viewModel.setAmPreferences(identifier, value);
		}
	}
	function handleSelectLabelChange(e){
		const value = e.target.value !== "null" ? e.target.value : null,
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
					value={values[0]}
					onChange={handleSelectMatrixChange}
				>
					<option value={"null"} >No distance matrix</option>
					{matrices.map((d) => {
						return <option value={d}>{d}</option>
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="orderBy">
				<Form.Label>Order by</Form.Label>
				<Form.Control
					custom
					as="select"
					value={values[1]}
					onChange={handleSelectOrderChange}
				>
					<option value={"null"} >No order</option>
					<option value={"cluster"} >Cluster</option>
					{sorts.map((d) => {
						return <option value={d}>{d}</option>
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="label">
				<Form.Label>Labels</Form.Label>
				<Form.Control
					custom
					as="select"
					value={values[2]}
					onChange={handleSelectLabelChange}
				>
					<option value={"null"} >No label</option>
					{sorts.map((d) => {
						return <option value={d}>{d}</option>
					})}
				</Form.Control>
			</Form.Group>
		</Form>
	)
}
export default observer(AdjacencyMatrixPreferences);