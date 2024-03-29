import React from "react";
import { useStore } from "../../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import { useInstance } from "./../../../../useInstance";
import { AmPreferencesVM } from "./AmPreferencesVM";

const AmPreferences = observer(() => {

	const {
		handleSelectChange,
		matrixName,
		matrices,
		order,
		label,
		sorts,
		max,
		min,
		distMax,
		distMin
	} = useInstance(new AmPreferencesVM(useStore()));

	return(
		<Form className="chartPreferences">
			<Form.Group controlId="distanceMatrix">
				<Form.Label>Matrice delle distanze</Form.Label>
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
			<Form.Group controlId="orderBy">
				<Form.Label>Ordine</Form.Label>
				<Form.Control
					custom
					as="select"
					value={order}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noOrder"}>Nessun ordine</option>
					{sorts.map((d) => {
						return <option value={d} key={d}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="label">
				<Form.Label>Etichette</Form.Label>
				<Form.Control
					custom
					as="select"
					value={label}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noLabel"} >Nessuna etichetta</option>
					{sorts.map((d) => {
						return <option value={d} key={d}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="distMax">
				<Form.Label>Distanza massima</Form.Label>
				<p>{max}</p>
				<Form.Control
					as="input"
					value={distMax}
					//defaultValue={1000}
					onChange={handleSelectChange}
				>
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="distMin">
				<Form.Label>Distanza minima</Form.Label>
				<p>{min}</p>
				<Form.Control
					as="input"
					value={distMin}
					//defaultValue={0}
					onChange={handleSelectChange}
				>
				</Form.Control>
			</Form.Group>
		</Form>
	);
});
export default AmPreferences;