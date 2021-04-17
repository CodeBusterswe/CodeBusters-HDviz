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
		const value = e.target.value==="undefined" ? undefined : e.target.value,
			identifier = e.target.id;
		viewModel.setHmPreferences(identifier, value);
	}
	return(
		<Form className="chartPreferences">
			{
				identifiers.map((identifiers, index) => {
					return (
						<Form.Group controlId={identifiers} key={identifiers}>
							<Form.Label>{labels[index]}</Form.Label>
							<Form.Control
								custom
								as="select"
								value={values[index]}
								onChange={handleSelectChange}
							>
								<option value={"undefined"} key={"noDimensions"+identifiers}>No dimension</option>
								{keys.map((d) => {
									return <option value={d} key={d+identifiers}>{d}</option>;
								})}
							</Form.Control>
						</Form.Group>
					);
				})
			}
		</Form>
	);
};
export default observer(HeatMapPreferences);