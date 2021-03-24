import React,{useState} from "react";
import Select from "react-select";
import { Dropdown,DropdownButton,ButtonGroup,Button,Container,Row,Col,Alert} from "react-bootstrap";
import makeAnimated from "react-select/animated";
import { Form } from "react-bootstrap";
import { useStore } from "../../../../../../ContextProvider";

const OptionList = props => {
	const {options,table,hanldeAllOptions} =props;
	const viewModel = useStore();
	const [columnSelected, setcolumnSelected] = useState(null);
	const [compareValue, setCompareValue] = useState(null);
	const [conditionSelected, setConditionSelected] = useState(null);
	const [showInput, setShowInput] = useState(false);
	const [inputData, setInputData] = useState({value:""});
	//console.log("columnSelected:",columnSelected);
	const [query, setQuery] = useState(null);
	//console.log("parsedData:",parsedData);

	 async function handleColumnSelected(col){
		setcolumnSelected(col);
		//const {conditionSelected,inputData,table}=query;
		
		async function getQueryResult(){
			if(conditionSelected){
				console.log("conditionSelected:",conditionSelected,"inputData:",inputData,columnSelected);
				const data= await viewModel.getDatasetByCustomParams(columnSelected,conditionSelected,inputData,table);
				console.log("data:",data);
				return data;
		   }else{
				const data= await viewModel.getDatasetByParams(col,table);
				//console.log("data:",data);
				return data;
		   }
		}
		const parsedData=await getQueryResult();
		//console.log("getQueryResult:",parsedData);
		//setParsedData(parsedData)

		if(parsedData){
			console.log("col:",col);
			const [dimensions] = viewModel.parseAndLoadCsvDataFromDB(col);
			hanldeAllOptions(parsedData, dimensions,col);
			//console.log("dimensions:",dimensions);
		}
	}

	const custom_value=[{value:"=",label:"="},{value:">",label:">"},{value:"<",label:"<"},{value:">=",label:">="},{value:"<=",label:"<="},{value:"null",label:"nessun valore"}];
	//console.log("handleCustomValue:",conditionSelected.length)

	async function handleData(value){
		setConditionSelected(value);
		setShowInput(value==="null"?false:true);
		//setMessage(true)

	}

	const { value } = inputData;
	const onChange = e =>setInputData({ ...inputData, [e.target.name]: e.target.value });
	//console.log("onChange:",inputData,"CompareValue:",compareValue)
	const onSubmit = e => {
		e.preventDefault();
		setCompareValue(value);	
		handleColumnSelected(columnSelected);
	  };

	function handleCompareValue(value){
		console.log("Numeric value:",value);
		setCompareValue(value);
	}
	console.log("value selected:",conditionSelected?conditionSelected:"nessun valore");

	return (
		<div>
			<Form.Group controlId="columnOptionList">
				<Form.Label>Seleziona colonne</Form.Label>
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
			<br />
			<Row>
				<Col>
					{["Primary"].map(
						(variant)=>
							<DropdownButton as={ButtonGroup}
								key={variant}
								id={`dropdown-variants-${variant}`}
								variant={variant.toLowerCase()}
								title={"confronta valori"}
								
							>
								{custom_value.length>0?
									custom_value.map((item,index)=>
										<React.Fragment key={index}>
											<Dropdown.Item Key={item.value} eventKey={variant} onClick={()=>handleData(item.value)}>{item.label} </Dropdown.Item>
										</React.Fragment>
									):<h6>Loading...</h6>
								}
							</DropdownButton>
						,
					)
					}
				</Col>
				<Col>
				    
					{showInput?
						<Form.Group id="submit">
							<Row>
								<Col>
									<Form.Control type="number" name="value" value={value} onChange={onChange} placeholder="inserire un numero"/>
									<br />
								</Col>
								<Col>
									<Button variant="primary" onClick={onSubmit} type="submit">Invia</Button>
								</Col>
							</Row>
						</Form.Group>:" "
					}
				</Col>
			</Row>
			{/* {message?<Alert variant={"danger"}>puoi selezionare un valore</Alert>:null} */}
		</div>
	);
};
export default OptionList;