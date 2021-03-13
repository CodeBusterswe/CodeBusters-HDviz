import React from 'react'
import CheckBox from './CheckBox'
import { useStore } from "../../../ContextProvider"

const DimList = props => {
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
                (<li className="list-group-item text-secondary" key="checkall">
                    <input className="form-check-input" key="checkall" checked={allChecked} type="checkbox" value="checkedall" id="checkAll" onChange={handleAllChecked} /><label htmlFor="checkAll" className="h-6">Seleziona tutto</label>
                </li>) : (null)
            }
            <ul className="list-group list-group-horizontal d-inline-flex flex-wrap flex-fill">
                {
                    props.dims && dims.filter(dim => !dim.isRedux).map((dim) => {
                        return (<CheckBox key={dim.value} handleCheckChieldElement={handleCheckChieldElement} {...dim} />)
                    })
                }

            </ul>

        </div>
    )
}

export default DimList