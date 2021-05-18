import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import { SpmPreferencesVM } from "./SpmPreferencesVM";
import { useInstance } from "../../../../useInstance";

const SpmPreferences = observer(() => {

	const {
		handleSelectChange,
		identifiers,
		labels,
		axes,
		color,
		dimensions
	} = useInstance(new SpmPreferencesVM(useStore()));

	return (
		<Form className="chartPreferences">
			{
				identifiers.map((id, index) => {
					return (
						<Form.Group controlId={id} key={id}>
							<Form.Label className="labels">{labels[index]}</Form.Label>
							<Form.Control
								custom
								as="select"
								value={axes[index]}
								onChange={handleSelectChange.bind(null)}
							>
								<option value={"undefined"} key={"noDimensions "+id}>Nessuna dimensione</option>
								{dimensions.map((d) => {
									return <option value={d} key={d+id}>{d}</option>;
								})}
							</Form.Control>
						</Form.Group>
					);
				})
			}
			<Form.Group controlId="SPMcolor" key={"SPMcolor"}>
				<Form.Label className="labels">Colore</Form.Label>
				<Form.Control
					custom
					as="select"
					value={color}
					onChange={handleSelectChange.bind(null)}
				>
					<option value={"undefined"} key={"noDimensionsColor"}>Nessun colore</option>
					{dimensions.map((d) => {
						return <option value={d} key={d+"Color"}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>
		</Form>
	);
});
export default SpmPreferences;