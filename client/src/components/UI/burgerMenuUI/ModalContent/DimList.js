import React from "react";
import {Form} from "react-bootstrap";
const DimList = (props) => {
	const {
		dimensions,
		selectAllDimensions,
		selectDimension,
		allSelected
	} = props;
	return (
		<Form>
			{
				dimensions.length!==0 ? 
					<>
						<Form.Label className="mt-1">Seleziona le dimensioni da utilizzare:</Form.Label> 
						<Form.Row>
							<Form.Check 
								custom
								type="checkbox"
								checked={allSelected}
								key="checkAll"
								value="checkAll"
								id="checkAll"
								label="Seleziona tutto"
								onChange={selectAllDimensions}
							/>
						</Form.Row><Form.Row>
							{	
								dimensions.filter(dim => !dim.isReduced).map((dim) =>
								{
									return <Form.Check
										custom
										inline
										type="checkbox"
										checked={dim.isChecked}
										key={dim.value}
										id={dim.value}
										label={dim.value}
										onChange={selectDimension}
									/>;
								})
							}
						</Form.Row> 
					</> : 
					null
			}
		</Form>
	);
};

export default DimList;