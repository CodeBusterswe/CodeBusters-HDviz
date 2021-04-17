import React from "react";
import Menu from "./UI/burgerMenuUI/Menu";
import "./style.css";
import "../App.css";
import Header from "./UI/headerUI/Header";
import Graph from "./UI/graphUI/Graph";
import ViewModel from "../ViewModel";
import { AppContextProvider } from "../ContextProvider";

const View = () => {
	const viewModel = new ViewModel();
	return (
		<AppContextProvider value={viewModel}>
			<Header/>
			<Menu/>
			<Graph/>
		</AppContextProvider>
	);
};
export default View;