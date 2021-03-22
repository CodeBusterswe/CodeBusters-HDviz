import React,{useState,useEffect} from "react";
import { Dropdown,DropdownButton,ButtonGroup,Container,Row,Col } from "react-bootstrap";
import { useStore } from "../../../../../../ContextProvider";
import {OptionList} from "./";
export const DropDown = props => {
	const {Dataset,Columns,getAllOptions}=props;
	const viewModel = useStore();
	const [getColumns,setColumns] = useState(null);
	const [columnOption, setcolumnOption] = useState(null);
	const [table, setTable] = useState(null);
	
	useEffect(async() => {
		//const col =await viewModel.getColumnsWithName();
		//setColumns(col);		
		return () => {
		};
	},[]);

	async function handleData(table_name){
	//	console.log("selected:",table_name)
		const col =await viewModel.getColumnsWithName(table_name);
		setColumns(col);
		setTable(table_name);
		const colList =await viewModel.getColumnList(table_name);
		console.log("colList:",colList);
		setcolumnOption(colList);
		//viewModel.getTableWithName(table_name)	
	}

	//handle column selected
	/* 	function handleColumnSelected(col){
		setcolumnSelected(col)
		setQuery(columnSelected)
		console.log("Query:", A.map(i=>i));
		viewModel.getDatasetByParams(A,table)
	} */
	function hanldeAllOptions(newData,dims){
		getAllOptions(newData,dims);
		console.log("hanldeAllOptions:",newData, "dims:",dims);
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
			</Row>
			<Dropdown.Divider/>
			<Row>
				<Col>
					<OptionList	options={columnOption} table={table} hanldeAllOptions={hanldeAllOptions}/>
				</Col>	
			</Row>
		</Container>
	);
};
export default DropDown;