import React from "react"
import { observer } from "mobx-react-lite";
import {Form} from "react-bootstrap"

const DimList = observer((props) => {
	const {
		dimensions,
		selectAllDimensions,
		selectDimension,
		allSelected
	} = props
	return (
		<Form>
			<Form.Row>
				{
					dimensions.length!==0 ?
						<Form.Check 
							custom
							inline
							type="checkbox"
							checked={allSelected}
							key="checkAll"
							value="checkAll"
							id="checkAll"
							label="Seleziona tutto"
							onChange={selectAllDimensions}
						/> : null
				}
			</Form.Row><Form.Row>
				{	
					dimensions.filter(dim => !dim._isRedux).map((dim) =>
					{
						return <Form.Check
							custom
							inline
							type="checkbox"
							checked={dim._isChecked}
							value={dim.value}
							key={dim.value}
							id={dim.value}
							label={dim.value}
							onChange={selectDimension}
						/>
					})
				}
			</Form.Row>
		</Form>
	)
})

export default DimList