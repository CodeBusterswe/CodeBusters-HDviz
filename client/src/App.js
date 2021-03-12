import React, { useContext } from 'react'
import Model from './model/Model'
import ViewModel from './ViewModel'
import ViewController from './ViewController'

const App = () => {
  const model = useContext(Model);
  const viewModel = new ViewModel(model);
  return (
    <ViewController viewModel = {viewModel}/>
  )
}

export default App;
