import React from "react";
import Select from "react-select";

const algoritmi = [
	{ label: "FASTMAP", value: 1 },
	{ label: "T-SNE", value: 2 },
	{ label: "ISOMAP", value: 3 },
	{ label: "LLE", value: 4 }
];

const SelectorDimension = props => {
	const {

	} = props

	return (
		<div className="listDimension">
			<Select options={ algoritmi } />  
		</div>
	)
}
export default SelectorDimension       