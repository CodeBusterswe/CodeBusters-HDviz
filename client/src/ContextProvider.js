import {createContext, useContext} from "react"
import ViewModel from "./ViewModel";

export const AppContext = createContext(ViewModel);
export const AppContextProvider = AppContext.Provider;
export const useStore = () => useContext(AppContext);