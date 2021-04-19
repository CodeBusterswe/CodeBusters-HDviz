import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import RootStore from "./../stores/RootStore";
import {AppContextProvider} from "./../ContextProvider";
import Menu from "./../components/UI/burgerMenuUI/Menu";
import Dimension from "./../stores/data/Dimension";

let rootStore,
	dimension1,
	dimension2,
	dataset;

function reducedDim(value) { return value[0] === "test1" || value[0] === "test2";}

describe("riduzione dimensionale", () => {

	rootStore = new RootStore();
	rootStore.datasetStore.reset();
	dimension1 = new Dimension("peso");
	dimension2 = new Dimension("altezza");
	dataset = [{peso: 80, altezza: 175},{peso: 60, altezza: 162}];

	beforeEach(()=>{

		rootStore.datasetStore.loadData(dataset);
		rootStore.datasetStore.loadDimensions([dimension1,dimension2]);
		rootStore.datasetStore.updateSelectedData();
		
		render(
			<AppContextProvider value={rootStore}>
				<Menu/>
			</AppContextProvider>
		);
		fireEvent.click(screen.getByRole("button",{name: "Riduci dimensioni" }));	
		fireEvent.change(screen.getByRole("textbox",{name:"New dimensions name"}),{target:{value: "test"}});
	});

	test("riduzione dimensionale fastmap", () => {
		fireEvent.click(screen.getByRole("button",{name: "Start reduction" }));	
		
		let values = rootStore.datasetStore.selectedData.map(row => Object.entries(row).filter(reducedDim)),
			row1 = [values[0][0][1], values[0][1][1]],
		    row2 = [values[1][0][1], values[1][1][1]];
		expect(row1).toStrictEqual([23.853720883753123, 3.3717478808715233e-7]);
		expect(row2).toStrictEqual([0, 0]);
	});

	test("riduzione dimensionale LLE", () => {

	});

	test("riduzione dimensionale IsoMap", () => {

	});

	test("riduzione dimensionale t-SNE", () => {

	});

});