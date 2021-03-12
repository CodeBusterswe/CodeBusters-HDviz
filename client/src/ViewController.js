import React from 'react'
import View from './View'
import {observer} from 'mobx-react-lite'

const Controller = observer((props) => {

    /*
        il view controller viene usato per non far fare nessuna logica alla view
        solitamente per questo viene usato il viewmodel, ma in questo caso in cui i componenti usano anche gli stati 
        (quindi anche un po di parte logica) viene utilizzato un controller specifico per la view
        con questo controller posso quindi collegare click a una funzione del viewmodel, 
        ma anche gestire lo stato della view in base ad una risposta della viewmodel
    */
    
    const {viewModel} = props

    return(
        <View
            value={viewModel.getDimensions()}
        />
    )
})
export default Controller