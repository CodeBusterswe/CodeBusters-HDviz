import React, { useContext } from 'react'
import Store from './model/Model'
import ViewModel from './ViewModel'
import ViewController from './ViewController'

const App = () => {
  const store = useContext(Store);
  const viewModel = new ViewModel(store);
  return (
    <ViewController viewModel = {viewModel}/>
  )
}

export default App;
