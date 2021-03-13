import React from 'react'
import ViewModel from './ViewModel'
import View from "./components/View";
import {AppContextProvider} from "./ContextProvider";

const App = () => {
  const viewModel = new ViewModel();
  return (
    <AppContextProvider value={viewModel}>
      <View/>
    </AppContextProvider>
  )
}

export default App;
