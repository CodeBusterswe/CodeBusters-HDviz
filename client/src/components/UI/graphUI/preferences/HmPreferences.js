import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import { useInstance } from "./../../../../useInstance";
import { HmPreferencesVM } from "./HmPreferencesVM";

const HmPreferences = observer(() => {

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
				identifiers.map((id, index) => {
					return (
						<Form.Group controlId={id} key={id}>
							<Form.Label>{labels[index]}</Form.Label>
							<Form.Control
								custom
								as="select"
								value={values[id]}
								onChange={handleSelectChange}
							>
								<option value={"undefined"} key={"noDimensions"+id}>No dimension</option>
								{keys.map((d) => {
									return <option value={d} key={d+id}>{d}</option>;
								})}
							</Form.Control>
						</Form.Group>
					);
				})
			}
		</Form>
	);
});
export default HmPreferences;