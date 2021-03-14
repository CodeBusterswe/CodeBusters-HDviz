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
			{
				dimensions.length!==0 ?
					<Form.Check 
						type="checkbox"
						checked={allSelected}
						key="checkAll"
						id="checkAll"
						label="Seleziona tutto"
						onChange={selectAllDimensions}
					/> : null
			}
			{	
				dimensions.filter(dim => !dim._isRedux).map((dim) =>
				{
					return <Form.Check
						type="checkbox"
						checked={dim._isChecked}
						key={dim.value}
						id={dim.value}
						label={dim.value}
						onChange={selectDimension}
					/>
				})
			}
		</Form>
	)
})

export default DimList