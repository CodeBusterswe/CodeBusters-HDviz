import React,{useState,useEffect} from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Form } from "react-bootstrap";
import { useStore } from "../../../../../../ContextProvider";

const OptionList = props => {
	const {options,table,hanldeAllOptions} =props;
	const viewModel = useStore();
	const [dataSelected, setDataSelected] = useState();
	const [columnSelected, setcolumnSelected] = useState(null);
	//console.log("dataSelected:",dataSelected);
	async function handleColumnSelected(col){
		setcolumnSelected(col);
		const parsedData= await viewModel.getDatasetByParams(col,table);
		//var myJsonString = JSON.stringify(parsedData);
		console.log("parsedData:",parsedData);

		setDataSelected(parsedData);
		if(dataSelected){
			function prepareData(){
				return parsedData.map(data=> {
					return {data:Object.values(data)};
				});
			}
			const toParseData=prepareData();
			const [data, dimensions] = viewModel.parseAndLoadCsvData(toParseData);
			hanldeAllOptions(data, dimensions);
			//console.log("parsedData:",data, "dimensions:",dimensions);
		}
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