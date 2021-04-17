import React from "react";
import {Form} from "react-bootstrap";
import { observer } from "mobx-react-lite";
const DimensionsList = observer((props) => {
	const {
		dimensions,
		selectAllDimensions,
		selectDimension,
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
								checked={dimensions.length === dimensions.filter(d => d.isChecked).length}
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
});

export default DimensionsList;