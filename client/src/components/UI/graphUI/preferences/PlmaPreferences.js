import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useInstance } from "./../../../../useInstance";
import { PlmaPreferencesVM } from "./PlmaPreferencesVM";

const PlmaPreferences = observer(() => {

	const {
		handleSelectChange,
		handleMultiSelectChange,
		keys,
		colors,
		userColor,
		userDimensions
	} = useInstance(new PlmaPreferencesVM(useStore()));

	return(
		<Form className="chartPreferences">
			<Form.Group controlId="dimensionsToReduxList">
				<Form.Label>Dimensioni da visualizzare</Form.Label>
				<Select
					values={userDimensions}
					defaultValue={userDimensions}
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
				<Form.Label>Colore</Form.Label>
				<Form.Control
					custom
					as="select"
					value={userColor}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noDimensionsColor"}>Nessun colore</option>
					{colors.map((d) => {
						return <option value={d} key={d}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>
		</Form>
	);
});
export default PlmaPreferences;