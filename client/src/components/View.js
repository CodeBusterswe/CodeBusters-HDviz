import React from "react";
import Menu from "./UI/burgerMenuUI/Menu";
import "./style.css";
import "../App.css";
import Header from "./UI/headerUI/Header";
import Graph from "./UI/graphUI/Graph";
import RootStore from "../stores/RootStore";
import { AppContextProvider } from "../ContextProvider";

const View = () => {
	const rootStore = new RootStore();
	return (
		<>
			<Header/>
			<AppContextProvider value={rootStore}>
				<Menu/>
			</AppContextProvider>
		</>
	);
};
export default View;