import React,{useState,useEffect} from "react";
import { ModalBody,Form, ModalFooter,Dropdown,DropdownButton,ButtonGroup,Container,Row,Col } from "react-bootstrap"
import { useStore } from "../../../../../../ContextProvider"
import Select from "react-select"
import makeAnimated from "react-select/animated";
import {OptionList} from "./"
export const DropDown = props => {
	const {Dataset,Columns}=props;
	const viewModel = useStore();
	const [getColumns,setColumns] = useState(null)
	const [columnOption, setcolumnOption] = useState(null);
	const [columnSelected, setcolumnSelected] = useState(null);
	const [table, setTable] = useState(null);
	const [query, setQuery] = useState(null);
	
	useEffect(async() => {
		//const col =await viewModel.getColumnsWithName();
		//setColumns(col);		
		return () => {
		}
	},[])

	async function handleData(table_name){
	//	console.log("selected:",table_name)
		const col =await viewModel.getColumnsWithName(table_name);
		setColumns(col);
		setTable(table_name)
		const colList =await viewModel.getColumnList(table_name);
		console.log("colList:",colList)
		setcolumnOption(colList)
		//viewModel.getTableWithName(table_name)	
	}

	const A=[{name:"hoss",id:1},{name:"hoss",id:2},{name:"hoss",id:3}]
	//handle column selected
	function handleColumnSelected(col){
		setcolumnSelected(col)
		setQuery(columnSelected)
		console.log("Query:", A.map(i=>i));
		viewModel.getDatasetByParams(A,table)
	}
	return (
		<Container >
			<Row>
				<Col>
					<div>
						{["Primary"].map(
							(variant)=>
								<DropdownButton as={ButtonGroup}
									key={variant}
									id={`dropdown-variants-${variant}`}
									variant={variant.toLowerCase()}
									title={"Dataset"}
									
								>
									{Dataset[0].length>0?
										Dataset[0].map((item,index)=>
											<React.Fragment key={index}>
												<Dropdown.Item Key={item.table_name} eventKey={variant} onClick={()=>handleData(item.table_name)}>{index} {item.table_name} </Dropdown.Item>
											</React.Fragment>
										):<h6>Loading...</h6>
									}
								</DropdownButton>
							,
						)}
					</div>
				</Col>
				<Col>
					<OptionList	options={columnOption} selectValue={columnSelected} table={table}/>			
				</Col>
			</Row>
			{/**
			 <Row>
				<Form.Group controlId="columnOptionList">
				   
					<Form.Label>Select the dimensions to use</Form.Label>
					<Select
						value={columnSelected}
						options={columnOption}
						isMulti
						name="columnSelected"
						className="basic-multi-select"
						classNamePrefix="select"
						components={makeAnimated()}
						closeMenuOnSelect={false}
						onChange={handleColumnSelected}
						placeholder={columnSelected?"select value":"select dataset"}
					/>
					
				</Form.Group>
			</Row>
			 */}
		</Container>
	);
};

DropDown.propTypes = {
	
};

export default DropDown;