import React from "react"

const CheckBox = props => {
	const {

	} = props

	return (
		<li className="list-group-item text-secondary" key={props.value}>
			<input className="form-check-input" 
				key={props.value}
				id={props.value}
				onChange={props.handleCheckChieldElement} 
				type="checkbox" 
				checked={props.isChecked} 
				value={props.value} /> 
			<label htmlFor={props.value} className="h-6">{props.value}</label>
		</li>
	)
}

export default CheckBox