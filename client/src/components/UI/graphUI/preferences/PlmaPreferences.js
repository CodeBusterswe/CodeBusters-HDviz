import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const PlmaPreferences = () => {
	const viewModel = useStore();
	const keys = viewModel.getOptionsForReduxDimensionsList();
	const colors = viewModel.getCheckedDimensions();
	const [dimensions, color] = viewModel.getPlmaPreferences();

	function handleSelectChange(e){
		const value = e.target.value==="undefined" ? undefined : e.target.value,
			identifier = e.target.id;
		viewModel.setPlmaPreferences(identifier, value);
	}
	function handleMultiSelectChange(value, handler){
		switch(handler.action){
		case "select-option":
			viewModel.setPlmaPreferences("dimensions", value.map(val => val.value));
			break;
		case "remove-value":
			viewModel.setPlmaPreferences("dimensions", value.map(val => val.value));
			break;
		case "clear":
			viewModel.setPlmaPreferences("dimensions", []);
			break;
		default:
			break;
		}
	}

	return(
		<Form className="chartPreferences">
			<Form.Group controlId="dimensionsToReduxList">
				<Form.Label>Select the dimensions to show</Form.Label>
				<Select
					values={dimensions}
					options={keys}
					isMulti
					name="toReduxDimensionsList"
					className="basic-multi-select"
    				classNamePrefix="select"
					components={makeAnimated()}
					closeMenuOnSelect={false}
					onChange={handleMultiSelectChange}
				/>
			</Form.Group>
			<Form.Group controlId="color">
				<Form.Label>Color</Form.Label>
				<Form.Control
					custom
					as="select"
					value={color}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noDimensionsColor"}>No dimension</option>
					{colors.map((d) => {
						return <option value={d} key={d}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>
		</Form>
	);
};
export default observer(PlmaPreferences);