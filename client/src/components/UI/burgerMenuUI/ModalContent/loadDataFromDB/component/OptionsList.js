import React,{useState,useEffect} from "react";
import Select from "react-select"
import makeAnimated from "react-select/animated";
import { Form } from "react-bootstrap"
import { useStore } from "../../../../../../ContextProvider"

const OptionList = props => {
	const {options,selectValue,table} =props;
	const viewModel = useStore();
	//const [table_name, setTable_name] = useState(table);
	const [columnSelected, setcolumnSelected] = useState(null);
	function handleColumnSelected(col){
		setcolumnSelected(col)
		//setQuery(columnSelected)
		//console.log("options:",options,"col:",col, "table_name:",table);
		viewModel.getDatasetByParams(col,table)
	}
	return (
		<div>
			<Form.Group controlId="columnOptionList">
				<Form.Label>Seleziona parametri</Form.Label>
				<Select
					value={columnSelected}
					options={options}
					isMulti
					name="columnSelected"
					className="basic-multi-select"
					classNamePrefix="select"
					components={makeAnimated()}
					closeMenuOnSelect={false}
					onChange={handleColumnSelected}
					placeholder={"Scegli parametri"}
				/>
			</Form.Group>
		</div>
	);
};
export default OptionList;