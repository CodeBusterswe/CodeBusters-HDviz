import React, { useContext } from 'react'
import Store from './model/Model'
import ViewModel from './ViewModel'
import Controller from './ViewController'

const App = () => {
  const store = useContext(Store);
  const viewModel = new ViewModel(store);
  return (
    <Controller viewModel = {viewModel}/>
  )
}

export default App;
