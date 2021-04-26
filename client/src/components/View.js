import React from "react";
import Menu from "./UI/burgerMenuUI/Menu";
import "./style.css";
import Header from "./UI/headerUI/Header";
import Chart from "./UI/graphUI/Chart";
import RootStore from "../stores/RootStore";
import { AppContextProvider } from "../ContextProvider";

const View = () => {
	const rootStore = new RootStore();
	return (
		<>
			<AppContextProvider value={rootStore}>
				<Header/>
				<Menu/>
				<Chart/>
			</AppContextProvider>
		</>
	);
};
export default View;