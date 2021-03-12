import React from 'react'
import ViewModel from './ViewModel'
import ViewController from './ViewController'
import { AppContext, AppContextProvider, useStore } from "./ContextProvider";

const App = () => {
  const viewModel = new ViewModel(useStore());
  return (
    <AppContextProvider value={AppContext}>
      <ViewController viewModel = {viewModel}/>
    </AppContextProvider>
  )
}

export default App;
