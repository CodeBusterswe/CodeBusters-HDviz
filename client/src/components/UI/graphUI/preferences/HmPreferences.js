import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import { useInstance } from "./../../../../useInstance";
import { HmPreferencesVM } from "./HmPreferencesVM";

const HeatMapPreferences = observer(() => {

	const {
		handleSelectChange,
		keys,
		identifiers,
		values,
		labels
	} = useInstance(new HmPreferencesVM(useStore()));

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
});
export default HeatMapPreferences;