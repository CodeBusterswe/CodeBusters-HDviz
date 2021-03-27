import { createEvent, fireEvent, getByRole, getByText, render, screen, waitFor } from "@testing-library/react";
import DimensionalReduction from "./../UI/burgerMenuUI/ModalContent/DimensionalReduction.js";
import ViewModel from "../../ViewModel";
import App from "./../View";

test("riduzione dimensionale", async() => {
	render (<App/>);
	/*DimensionalReduction.handleChangeNeighbours(53);
	const vM = useStore();
	const rerender = render (<DimensionalReduction ViewModel={vM}/>);
	const x=this.props.getNeighbors();
	expect(x).toBe(53);*/
});