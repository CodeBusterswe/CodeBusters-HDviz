import {createContext, useContext} from 'react'
import Model from './model/Model'

export const AppContext = createContext(new Model());
export const AppContextProvider = AppContext.Provider;
export const useStore = () => useContext(AppContext);