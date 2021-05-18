import React from "react";
import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import RootStore from "../stores/RootStore";
import {AppContextProvider} from "../ContextProvider";
import Menu from "../components/UI/burgerMenuUI/Menu";
import Dimension from "../stores/data/Dimension";

let rootStore,//man: 0.69..., canberra: 0.096...cheb: 0.5
	dimension1,
	dimension2,
	dataset;

function getData() {return rootStore.distanceMatricesStore.getDistanceMatrixByName("test");}

describe("dimensional reduction through distance calculation", () => {

	rootStore = new RootStore();
	dimension1 = new Dimension("sepal");
	dimension2 = new Dimension("petal");
	dataset = [{sepal: 5.1, petal: 3.5},{sepal: 4.9, petal: 3.0}];

	beforeEach(()=>{

		rootStore.datasetStore.loadData(dataset);
		rootStore.datasetStore.loadDimensions([dimension1,dimension2]);
		rootStore.datasetStore.updateSelectedData();
		rootStore.distanceMatricesStore.reset();
		
		render(
			<AppContextProvider value={rootStore}>
				<Menu/>
			</AppContextProvider>
		);
		fireEvent.click(screen.getByRole("button",{name: "Calcola distanza" }));	
	});

	test("euclidean distance", () => {
		//set distance
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione"}));	
		//test new data
		let matrix = getData();
		expect(matrix.links).toStrictEqual([{source: "node0", target: "node1", value: 0.5385164807134502}]);
	});

	test("manhattan distance", () => {
		//set distance
		fireEvent.change(screen.getByRole("combobox",{name:"Tipo di distanza"}),{target:{value:"manhattan"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione" }));	
		//test new data
		let matrix = getData();
		expect(matrix.links).toStrictEqual([{source: "node0", target: "node1", value: 0.6999999999999993}]); 
	});

	test("canberra distance", () => {
		//set distance
		fireEvent.change(screen.getByRole("combobox",{name:"Tipo di distanza"}),{target:{value:"canberra"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione" }));	
		//test new data
		let matrix = getData();
		expect(matrix.links).toStrictEqual([{source: "node0", target: "node1", value: 0.09692307692307686}]);
	});

	test("chebyshev distance", () => {
		//set distance
		fireEvent.change(screen.getByRole("combobox",{name:"Tipo di distanza"}),{target:{value:"chebyshev"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione"}));	
		//test new data
		let matrix = getData();
		expect(matrix.links).toStrictEqual([{source: "node0", target: "node1", value: 0.5}]);
	});

	test("normalize data", () =>{
		fireEvent.click(screen.getByRole("checkbox", {name: "Normalizza i dati"}));
		//set algorithm
		fireEvent.change(screen.getByRole("combobox",{name:"Tipo di distanza"}),{target:{value:"chebyshev"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione"}));		
		//test new data
		let matrix = getData();
		expect(matrix.links).toStrictEqual([{source: "node0", target: "node1", value: 0.1428571428571429}]);
	});

	test("Checks that the name chosen for a new distance matrix is set correctly", () => {
		//set name
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione"}));	
		//check matrix name
		let matrices = rootStore.distanceMatricesStore.distanceMatricesNames;
		expect(matrices).toStrictEqual(["test"]);
	});
	
	test("Check that the user-calculated distance matrices are correctly loaded into the system", () => {
		//set name
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione"}));	
		//check matrix name
		let matrices = rootStore.distanceMatricesStore.distanceMatrices;
		expect(matrices.length).toBe(1);
	});

	test("Checks that the distance matrices are calculated correctly", () => {
		//set name
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione"}));	
		//check matrix name
		let matrix = getData();
		expect(matrix.links).toStrictEqual([{"source": "node0", "target": "node1", "value": 0.5385164807134502}]);
		expect(matrix.nodes).toStrictEqual([{"id": "node0", "petal": 3.5, "sepal": 5.1}, {"id": "node1", "petal": 3, "sepal": 4.9}]);
	});

	test("alert success", async () => {
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione" }));
		await waitFor(() => {
			expect(screen.getByRole("alert", "Operazione completata con successo")).toBeInTheDocument();
		});
	});
	test("error already used name", async() => {
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione" }));
		await waitFor(() => {
			fireEvent.click(screen.getByRole("button",{name: "Calcola distanza" }));	
		});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: ""}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione" }));
		expect(screen.getByRole("textbox",{name:"Nome matrice delle distanze"})).toBeInvalid();
	});
	test("alert error", async () => {
		let wrongdataset = [{prova: NaN, petal: "ciao"},{prova: 4.9, petal: 3.0}];
		rootStore.datasetStore.loadData(wrongdataset);
		rootStore.datasetStore.addDimensionsToDataset(new Dimension("prova"));
		rootStore.datasetStore.updateSelectedData();
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione" }));
		await waitFor(() => {
			expect(screen.getByRole("alert", "Avviso")).toBeInTheDocument();
		});
	});
});