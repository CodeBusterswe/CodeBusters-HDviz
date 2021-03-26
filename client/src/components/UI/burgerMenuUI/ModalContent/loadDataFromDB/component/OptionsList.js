import React,{useState,useEffect,useRef} from "react";
import Select from "react-select";
import { Dropdown,DropdownButton,ButtonGroup,Button,Row,Col,Alert,Badge} from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useStore } from "../../../../../../ContextProvider";

const OptionList = props => {
	const {options,table,hanldeAllOptions} =props;
	const viewModel = useStore();
	const [compareValue, setCompareValue] = useState(null);
	const [conditionSelected, setConditionSelected] = useState(null);
	const [valueFound, setValueFound] = useState(null);
	const [empty, setEmpty] = useState(false);
	const [inputData, setInputData] = useState({value:""});
	const [title, setTitle] = useState(false);

	async function handleCompareData(value){
		setCompareValue(value,empty);	
	}

	async function handleQueryResult(params) {
		if(params){
			const [dimensions] = viewModel.parseAndLoadCsvDataFromDB(options);
			hanldeAllOptions(params, dimensions);
		}
	}
	console.log(valueFound);
	async function handleData(value){
		setConditionSelected(value);
		setTitle(value);
	}

	const { value } = inputData;
	function onChange (e){
		setInputData({ ...inputData, [e.target.name]: e.target.value });
		
	}
	async function onSubmit(e ) {
		e.preventDefault();
		async function getQueryResult(){
			if(compareValue){
				const varables={options,compareValue,conditionSelected,inputData,table};
				const data= await viewModel.getDatasetByCustomParams(varables);
				return data;
		   }else{
				const data= await viewModel.getDatasetByParams(options,table);
				return data;
		   }
		}
		const data=await getQueryResult();
		if(data){
			setValueFound(data.length);
			setEmpty(true);
			console.log(data);
			handleQueryResult(data);
		}

	  }

	const custom_value=[{value:"=",label:"="},{value:">",label:">"},{value:"<",label:"<"},{value:">=",label:">="},{value:"<=",label:"<="},{value:"null",label:"nessun valore"}];
	return (
		<div>
			<br />
			<Row>
				<Col>
					{["Primary"].map(
						(variant)=>
							<DropdownButton as={ButtonGroup}
								//key={variant}
								id={`dropdown-variants-${variant}`}
								//variant={variant.toLowerCase()}
								title={"scegli valore"}
								variant="info"
							>
								{options?
									options.map((item,index)=>
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
								 variant={variant.toLowerCase()}
								title={"scegli operazione"}
								variant="info"
								disabled={compareValue?false:true}
									
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
				<Col>{!empty?"":<Alert variant ="danger">Il valore scelto non esiste</Alert>}</Col>	
			</Row>
			<Row>
				<Col>{valueFound? <Alert variant ="success">{valueFound} elementi trovati</Alert>:""}</Col>
			</Row>
		</div>
	);
};
export default OptionList;