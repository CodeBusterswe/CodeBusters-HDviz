import React,{useState} from "react";
import { Dropdown,DropdownButton,ButtonGroup,Container,Row,Col,Badge } from "react-bootstrap";
import { useStore } from "../../../../../../ContextProvider";
import {OptionList} from "./";
export const DropDown = props => {
	const {Dataset,getAllOptions}=props;
	const viewModel = useStore();
	const [columnOption, setcolumnOption] = useState(null);
	const [table, setTable] = useState(null);
	//console.log("getSelectedParams:",getSelectedParams)
	
	async function handleData(table_name){
		//const col =await viewModel.getColumnsWithName(table_name);
		setTable(table_name);
		const columnList =await viewModel.getColumnList(table_name);
		setcolumnOption(columnList);
		
	}
	function hanldeAllOptions(newData,dims){
		getAllOptions(newData,dims);
		//console.log("hanldeAllOptions:",newData, "dims:",dims);
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
												<Dropdown.Item Key={item.table_name} onClick={()=>handleData(item.table_name)}>{index} {item.table_name} </Dropdown.Item>
											</React.Fragment>
										):<h6>Loading...</h6>
									}
								</DropdownButton>
							,
						)}
						{<Badge variant="light">{"Dataset scelta: "} {table}</Badge>}
					</div>
				</Col>
			</Row>
			<Dropdown.Divider/>
			<Row>
				<Col>
					<OptionList	options={columnOption} table={table} hanldeAllOptions={hanldeAllOptions} />
				</Col>	
			</Row>
		</Container>
	);
};
export default DropDown;