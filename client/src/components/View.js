import React from "react"
import Menu from "./UI/burgerMenuUI/Menu"
import "./style.css"
import Header from "./UI/headerUI/Header"
import Graph from "./UI/graphUI/Graph"

const View = () => {
	return (
		<div>
			<Header />
			<Menu />
			<Graph/>
		</div>
	)
}
export default View