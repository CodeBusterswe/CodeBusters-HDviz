
import React, {useState} from "react"
import { observer } from "mobx-react-lite"
import BurgerMenu from "./UI/burgerMenuUI/BurgerMenu"
import Grafico from "./UI/graphUI/Grafico"
import "./style.css"
import { useStore } from "../ContextProvider";

const View = observer(() => {
	const viewModel = useStore()

	return (
		<div>
			<BurgerMenu />
			<Grafico />
		</div>
	)
})
export default View