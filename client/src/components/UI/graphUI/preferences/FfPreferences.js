import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import { useInstance } from "./../../../../useInstance";
import { FfPreferencesVM } from "./FfPreferencesVM";

const ForceFieldPreferences = observer(() => {

	const {
		handleSelectChange,
		keys,
		matrixName,
		matrices,
		color,
		max,
		min,
		distMax,
		distMin
	} = useInstance(new FfPreferencesVM(useStore()));

	return(
		<Form className="chartPreferences">
			<Form.Group controlId="distanceMatrix">
				<Form.Label>Matrice delle distanze:</Form.Label>
				<Form.Control
					custom
					as="select"
					value={matrixName}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noDistancematrix"}>Nessuna matrice</option>
					{matrices.map((d) => {
						return <option value={d} key={d}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="color">
				<Form.Label>Colore:</Form.Label>
				<Form.Control
					custom
					as="select"
					value={color}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noColor"}>Nessun colore</option>
					{keys.map((d) => {
						return <option value={d} key={d}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="distMax">
				<Form.Label>Distanza massima: {max}</Form.Label>
				<Form.Control
					as="input"
					value={distMax}
					onChange={handleSelectChange}
				>
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="distMin">
				<Form.Label>Distanza minima: {min}</Form.Label>
				<Form.Control
					as="input"
					value={distMin}
					onChange={handleSelectChange}
				>
				</Form.Control>
			</Form.Group>
		</Form>
	);
});
export default ForceFieldPreferences;
