import React from "react"
import {observer} from "mobx-react-lite"

const Label = observer((props) => {
	console.log(props)
	return(
		<p>label: {props.value}</p>
	)
})
export default Label