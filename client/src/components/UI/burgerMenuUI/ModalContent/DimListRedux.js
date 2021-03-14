import React from "react"
import CheckBoxRedux from "../CheckBoxRedux"
import { useStore } from "../../../../ContextProvider"

const DimListRedux = props => {
	const viewModel = useStore()
	const {
		dataLoaded,
		allChecked,
		handleAllChecked,
		handleCheckChieldElement,
		dims
	} = props

	return (
		<div>
			{dataLoaded ? 
				<li className="list-group-item text-secondary" key="checkall_r">
					<input className="form-check-input" key="checkall_r" checked={allChecked} type="checkbox" value="checkedall" id="checkAll_r" onChange={handleAllChecked} /><label htmlFor="checkAll_r" className="h-6">Seleziona tutto</label> 
				</li> : null
			}
			<ul className="list-group list-group-horizontal d-inline-flex flex-wrap flex-fill">
				{
					dims && dims.filter(dim => dim.isChecked && dim.isNumeric).map((dim)=>{
						return <CheckBoxRedux key={dim.value+"_r"} handleCheckChieldElement={handleCheckChieldElement} {...dim} />
					})
				}
			</ul>
		</div>
	);
}

export default DimListRedux