import React, { useContext } from 'react'
import Store from './Model'
import ViewModel from './components/ViewModel'
import Controller from './components/Controller'

const App = () => {
  const store = useContext(Store);
  const viewModel = new ViewModel(store);
  return (
    <Controller viewModel = {viewModel}/>
  )
}

export default App;
