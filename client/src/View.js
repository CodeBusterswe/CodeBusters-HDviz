import React from 'react'
import Label from './UI/Label'
import { Button } from 'react-bootstrap';
import {observer} from 'mobx-react-lite'

const View = observer((props) => {
    const{
        value,
        increment
    } = props
    return (
        <div>
            <p>View: {value}</p>
            <Label key="Label_Count" value={value}/>
            <Button onClick={increment}>Incrementa</Button>
        </div>
    )
})
export default View