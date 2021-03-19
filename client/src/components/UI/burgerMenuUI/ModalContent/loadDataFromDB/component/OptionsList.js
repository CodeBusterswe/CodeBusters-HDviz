import React,{useState,useEffect} from "react";
import Select from "react-select"
import makeAnimated from "react-select/animated";
import { ModalBody,Form, ModalFooter,Dropdown,DropdownButton,ButtonGroup,Container,Row,Col } from "react-bootstrap"
import { useStore } from "../../../../../../ContextProvider"

const OptionList = props => {
	const {options,selectValue,table} =props;
	const viewModel = useStore();
	const [table_name, setTable_name] = useState(table);
	const [columnSelected, setcolumnSelected] = useState(null);
	function handleColumnSelected(col){
		setcolumnSelected(col)
		//setQuery(columnSelected)
		console.log("options:",options,"col:",col, "table_name:",table);
		viewModel.getDatasetByParams(col,table)
	}
	return (
		<div>
			<Form.Group controlId="columnOptionList">
				<Form.Label>Select Option list</Form.Label>
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
					//placeholder={selectValue?"select value":"select dataset"}
				/>
			</Form.Group>
		</div>
	);
};
export default OptionList;