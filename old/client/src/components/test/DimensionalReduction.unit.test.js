import { createEvent, fireEvent, getByRole, getByText, render, screen, waitFor } from "@testing-library/react";
import DimensionalReduction from "./../UI/burgerMenuUI/ModalContent/DimensionalReduction.js";
import ViewModel from "../../ViewModel";
import App from "./../View";
import React, { useReducer } from "react";

let vM;

beforeEach(() => {
	vM = new ViewModel();
});

test("riduzione dimensionale", async() => {
	/*const handleUpdate = () => {
		this.forceUpdate();
	};*/
	render(<App />);
	/*(<DimensionalReduction/>);
	fireEvent.click(screen.getByRole("button",{name: "Riduci dimensioni" }));	
	expect(screen.getByRole("button",{name: "Start reduction" })).toBeInTheDocument();
	fireEvent.keyDown(screen.getByRole("combobox",{name:"Select algorithm"},{key:"LLE"}));
	expect(screen.getByText("LLE")).toBeInTheDocument();
	<DimensionalReduction/>;
	fireEvent.change(screen.getByRole("textbox",{name:"New dimensions name"}),"test1");
	fireEvent.change(screen.getByText("New dimensions number"),5);
	fireEvent.click(screen.getByRole("button",{name:"Start reduction"}));
	await waitFor(() => {
		
		expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
	});	*/	
});