import React from "react";
import Select from "react-select";

const algoritmi = [

  { label: "FASTMAP", value: "FASTMAP" },
  { label: "LLE", value: "LLE" },
  { label: "ISOMAP", value: "ISOMAP" },
  { label: "T-SNE", value: "T-SNE" }
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