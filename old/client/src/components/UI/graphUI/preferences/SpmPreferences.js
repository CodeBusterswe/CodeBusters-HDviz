import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";

const ScatterPlotMatrixPreferences = () => {
	const viewModel = useStore();
	const [axis, color] = viewModel.getSpmPreferences();
	const keys = viewModel.getCheckedDimensions();
	const labels = ["Axis one", "Axis two", "Axis Three", "Axis Four", "Axis Five"];
	const identifiers = ["axis1", "axis2", "axis3", "axis4", "axis5"];

	//Funzione che non permette di selezionare più volte la stessa dimensione
	function handleSelectChange(e){
		const identifier = e.target.id;
		const value = e.target.value==="undefined" ? undefined : e.target.value;
		viewModel.setSpmAxis(identifier, value);
	}

	return (
		<Form className="chartPreferences">
			{
				identifiers.map((identifiers, index) => {
					return (
						<Form.Group controlId={identifiers} key={identifiers}>
							<Form.Label className="labels">{labels[index]}</Form.Label>
							<Form.Control
								custom
								as="select"
								value={axis[index]}
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
			<Form.Group controlId="color" key={"color"}>
				<Form.Label className="labels">Color</Form.Label>
				<Form.Control
					custom
					as="select"
					value={color}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noDimensionsColor"}>No dimension</option>
					{keys.map((d) => {
						return <option value={d} key={d+"Color"}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>
		</Form>
	);
};
export default observer(ScatterPlotMatrixPreferences);