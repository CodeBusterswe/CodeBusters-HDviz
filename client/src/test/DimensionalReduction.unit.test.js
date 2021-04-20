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
function getData() {return rootStore.datasetStore.selectedData.map(row => Object.entries(row).filter(reducedDim));}

describe("riduzione dimensionale", () => {

	rootStore = new RootStore();
	rootStore.datasetStore.reset();
	dimension1 = new Dimension("sepal");
	dimension2 = new Dimension("petal");
	dataset = [{sepal: 5.1, petal: 3.5},{sepal: 4.9, petal: 3.0}];

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
	});

	test("riduzione dimensionale fastmap", () => {
		//set algorithm
		fireEvent.change(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione" }));	
		//test new data
		let values = getData(),
			row1 = [values[0][0][1], values[0][1][1]],
		    row2 = [values[1][0][1], values[1][1][1]];
		expect(row1).toStrictEqual([0.5385164807134502, 0]);
		expect(row2).toStrictEqual([0, 0]);
	});

	test("riduzione dimensionale LLE", () => {
		//set algorithm
		fireEvent.change(screen.getByRole("combobox",{name:"Algoritmo"}),{target:{value:"lle"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione" }));	
		//test new data
		let values = getData(),
			row1 = [values[0][0][1], values[0][1][1]],
		    row2 = [values[1][0][1], values[1][1][1]];
		expect(row1).toStrictEqual([NaN, NaN]);
		expect(row2).toStrictEqual([NaN, NaN]);
	});

	test("riduzione dimensionale IsoMap", () => {
		//set algorithm
		fireEvent.change(screen.getByRole("combobox",{name:"Algoritmo"}),{target:{value:"isoMap"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione" }));	
		//test new data
		let values = getData(),
			row1 = [values[0][0][1], values[0][1][1]],
		    row2 = [values[1][0][1], values[1][1][1]];
		expect(row1).toStrictEqual([-0.7071067811865475, 0.7071067811865475]);
		expect(row2).toStrictEqual([0.7071067811865475, -0.7071067811865475]);
	});

	test("riduzione dimensionale t-SNE", () => {
		//set algorithm
		fireEvent.change(screen.getByRole("combobox",{name:"Algoritmo"}),{target:{value:"t-sne"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione" }));	
		//test new data
		let values = getData(),
			row1 = [values[0][0][1], values[0][1][1]],
		    row2 = [values[1][0][1], values[1][1][1]];
		expect(row1).toStrictEqual([-7.964809061175129, 56.35862642658786]);
		expect(row2).toStrictEqual([7.964809061175129, -56.35862642658786]);
	});
});