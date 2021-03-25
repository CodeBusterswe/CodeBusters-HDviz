import React,{useState,useEffect,useRef} from "react";
import Select from "react-select";
import { Dropdown,DropdownButton,ButtonGroup,Button,Row,Col,Alert,Badge} from "react-bootstrap";
import makeAnimated from "react-select/animated";
import { Form } from "react-bootstrap";
import { useStore } from "../../../../../../ContextProvider";

const OptionList = props => {
	const {options,table,hanldeAllOptions} =props;
	const viewModel = useStore();
	const [columnSelected, setcolumnSelected] = useState(null);
	const [compareValue, setCompareValue] = useState(null);
	const [conditionSelected, setConditionSelected] = useState(null);
	const [valueFound, setValueFound] = useState(null);
	const [empty, setEmpty] = useState(false);
	const [loading, setLoading] = useState(false);
	const [inputData, setInputData] = useState({value:""});
	const [title, setTitle] = useState(false);

	 async function handleColumnSelected(col){
		setcolumnSelected(col);
	}

	async function handleDataByColumnName(params) {

		async function getQueryResult(){
			if(compareValue){
				const varables={columnSelected,compareValue,conditionSelected,inputData,table};
				const data= await viewModel.getDatasetByCustomParams(varables);
				if(data){
					setEmpty(true);
				}
				return data;
		   }else{
				const data= await viewModel.getDatasetByParams(params,table);
				if(data){
					setEmpty(true);
				}
				return data;
		   }
		}
		const parsedData=await getQueryResult();

		if(!empty){
			setLoading(true);
			setValueFound(null);
		}

		if(parsedData.length){
			setLoading(false);
			setValueFound(parsedData.length);
			const [dimensions] = viewModel.parseAndLoadCsvDataFromDB(params);
			hanldeAllOptions(parsedData, dimensions,params);
		}
	}

	const custom_value=[{value:"=",label:"="},{value:">",label:">"},{value:"<",label:"<"},{value:">=",label:">="},{value:"<=",label:"<="},{value:"null",label:"nessun valore"}];
	//console.log("handleCustomValue:",conditionSelected.length)

	async function handleCompareData(value){
		setCompareValue(value);	
	}
	async function handleData(value){
		setConditionSelected(value);
		
		//setCompareValue(value);	
		setTitle(value);
		//setShowInput(value==="null"?false:true);
		//setMessage(true)

	}

	const { value } = inputData;
	function onChange (e){
		setInputData({ ...inputData, [e.target.name]: e.target.value });
		
	}
	//console.log("onChange:",inputData,"CompareValue:",compareValue)
	const onSubmit = e => {
		e.preventDefault();
		handleColumnSelected(columnSelected);
		handleDataByColumnName(columnSelected);
	  };

	function handleCompareValue(value){
		console.log("Numeric value:",value);
		setCompareValue(value);
	}
	console.log("value selected:",conditionSelected?conditionSelected:"nessun valore");
	const defaultValue = { label:"Choose something", value: 0 };
	return (
		<div>
			<Form.Group controlId="columnOptionList">
				<Form.Label>Seleziona colonne</Form.Label>
				<Select
				    
					value={columnSelected||" "}
					defaultValue={defaultValue}
					options={options}
					isMulti
					name="columnSelected"
					className="basic-multi-select"
					classNamePrefix="select"
					components={makeAnimated()}
					closeMenuOnSelect={false}
					onChange={handleColumnSelected}
					placeholder={"Scegli parametri"}
					isDisabled={table?false:true}
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
								//variant={variant.toLowerCase()}
								title={"scegli valore"}
								variant="info"
		
							>
								{columnSelected?
									columnSelected.map((item,index)=>
										<React.Fragment key={index}>
											<Dropdown.Item Key={item.value} eventKey={variant} onClick={()=>handleCompareData(item.value)}>{item.label} </Dropdown.Item>
										</React.Fragment>
									):<h6>scegli dataset</h6>
								}
							</DropdownButton>
						,
					)
					}			
					{"    "}
					<Badge variant="light">{"valore scelto: "} {compareValue}</Badge>{" "}

				</Col>
				<br/>
				<br/>
				<Col>
					{["Primary"].map(
						(variant)=>
							<DropdownButton as={ButtonGroup}
								key={variant}
								id={`dropdown-variants-${variant}`}
								//variant={variant.toLowerCase()}
								title={"scegli operazione"}
								variant="info"
								//ref={target}
								disabled={columnSelected?false:true}
									
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
					{"    "}
					<Badge variant="light">{"operazione scelta: "} {title}</Badge>{" "}

				</Col>
				<br/>
				<br/>
			</Row>
			<br/>
			<br/>
			<Row>
				<Col>
					<Form.Group id="submit">
						<Row>
							<Col>
								<Form.Control type="number" name="value" value={value} onChange={onChange} placeholder="inserire un numero"/>
								<br />
							</Col>
						</Row>
						<br/>
						
						<Row>
							<Col>
								<Button variant="primary" onClick={onSubmit} type="submit">Invia</Button>
							</Col>
						</Row>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col>{!loading?"":<Alert variant ="danger">Il valore scelto non esiste</Alert>}</Col>
				
			</Row>
			<Row>
				<Col>{valueFound?<Alert variant ="success">{valueFound} elementi trovati</Alert>:" "}</Col>
			</Row>
			{/* {message?<Alert variant={"danger"}>puoi selezionare un valore</Alert>:null} */}
		</div>
	);
};
export default OptionList;