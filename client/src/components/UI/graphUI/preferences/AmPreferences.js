import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";

const AdjacencyMatrixPreferences = () => {
	const viewModel = useStore();
	const sorts = viewModel.getCheckedDimensions();
	const matrices = ["matrix1", "matrix2"]//viewModel.getMatricesNames();
	const matrixName = null //viewModel.getAmMatrixNames();
	const sort = null //viewModel.getAmSort();

	function handleSelectMatrixChange(e){
		const value = e.target.value;
		//viewModel.setAmMatrixName(e.target.value)
		console.log("matrix name: ", value);
	}
	function handleSelectSortChange(e){
		const id = e.target.id, value = e.target.value;
		console.log("id: ", id);
		console.log("value: ", value);
		//viewModel.setAmSort(value)
		if(id === "cluster"){
			console.log("sort by cluster")
		}else{
			console.log("sort by ", value)
		}
	}

	return(
		<Form className="chartPreferences">
			<Form.Group controlId="matrixName">
				<Form.Label>Matrix</Form.Label>
				<Form.Control
					custom
					as="select"
					value={matrixName}
					onChange={handleSelectMatrixChange}
				>
					<option value={"null"} >No matrix</option>
					{matrices.map((d) => {
						return <option value={d}>{d}</option>
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="sort">
				<Form.Label>Sort by</Form.Label>
				<Form.Control
					custom
					as="select"
					value={sort}
					onChange={handleSelectSortChange}
				>
					<option value={"null"} >No sorting</option>
					{sorts.map((d) => {
						return <option value={d}>{d}</option>
					})}
				</Form.Control>
			</Form.Group>
		</Form>
	)
}
export default observer(AdjacencyMatrixPreferences);