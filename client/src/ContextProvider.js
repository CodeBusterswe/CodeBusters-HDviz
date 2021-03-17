import {createContext, useContext} from "react"
import ViewModel from "./ViewModel";
import {getDataset} from "./model/services" 

export const AppContext = createContext(ViewModel);
export const AppContextProvider = AppContext.Provider;
export const useStore = () => useContext(AppContext);