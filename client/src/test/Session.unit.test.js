import React from "react";
import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import RootStore from "../stores/RootStore";
import {AppContextProvider} from "../ContextProvider";
import Menu from "../components/UI/burgerMenuUI/Menu";
import Dimension from "../stores/data/Dimension";
import DistanceMatrix from "../stores/data/DistanceMatrix";
import Header from "../components/UI/headerUI/Header";

const json = {
	"preferencesStore":{
		"chart":"plma",
		"preferencesAm":{"distanceMatrix":"undefined","orderBy":"undefined","label":"undefined","distMax":"Infinity","distMin":0},
		"preferencesFf":{"distanceMatrix":"euclidean","color":"undefined","distMax":"Infinity","distMin":0},
		"preferencesHm":{"xAxis":"undefined","yAxis":"undefined","heat":"undefined"},
		"preferencesPlma":{"dimensions":["sepal","petal"],"color":"undefined"},
		"preferencesSpm":{"axis1":"sepal","axis2":"petal","axis3":"undefined","axis4":"undefined","axis5":"undefined","SPMcolor":"undefined"}
	},
	"datasetStore":{
		"dimensions":[
			{"_value":"sepal","_isChecked":true,"_isNumeric":true,"_isRedux":false},
			{"_value":"petal","_isChecked":true,"_isNumeric":true,"_isRedux":false}],
		"data":[{"sepal":5.1,"petal":3.5},{"sepal":4.9,"petal":3}],
		"selected":[{"sepal":5.1,"petal":3.5},{"sepal":4.9,"petal":3}]},
	"distanceMatricesStore":[{
		"nodes":[{"sepal":5.1,"petal":3.5,"id":"node0"},{"sepal":4.9,"petal":3,"id":"node1"}],
		"link":[{"source":"node0","target":"node1","value":0.5385164807134502}],
		"name":"euclidean"}]
};

const jsonWrong = {
	"preferencesStore":{
		"chart":"plma",
		"preferencesAm":{"distanceMatrix":"undefined","orderBy":"undefined","label":"undefined","distMax":"Infinity","distMin":0},
		"preferencesFf":{"distanceMatrix":"euclidean","color":"undefined","distMax":"Infinity","distMin":0},
		"preferencesSpm":{"axis1":"sepal","axis2":"petal","axis3":"undefined","axis4":"undefined","axis5":"undefined","SPMcolor":"undefined"}
	},
	"datasetStore":{
		"dimensions":[
			{"_value":"sepal","_isRedux":false},
			{"_value":"petal","_isChecked":true,"_isNumeric":true,"_isRedux":false}],
		"data":[{"sepal":5.1,"petal":3.5},{"sepal":4.9,"petal":3}],
		"selected":[{"sepal":5.1,"petal":3.5},{"sepal":4.9,"petal":3}]},
	"distanceMatricesStore":[{
		"nodes":[{"sepal":5.1,"petal":3.5,"id":"node0"},{"sepal":4.9,"petal":3,"id":"node1"}],}
	]
};

describe("View session", ()=>{
	const dataset = [{sepal: 5.1, petal: 3.5},{sepal: 4.9, petal: 3.0}];
	const dimension1 = new Dimension("sepal");
	const dimension2 = new Dimension("petal");
	const distanceMatrix = new DistanceMatrix();
	distanceMatrix.name = "euclidean";
	distanceMatrix.pushNode({sepal: 5.1, petal: 3.5, id: "node0"});
	distanceMatrix.pushNode({sepal: 4.9, petal: 3.0, id: "node1"});
	distanceMatrix.pushLink({ source: "node0", target: "node1", value: 0.5385164807134502 });
	const rootStore = new RootStore();
	const datasetStore = rootStore.datasetStore;
	const preferencesStore = rootStore.preferencesStore;
	const distanceMatricesStore = rootStore.distanceMatricesStore;

	beforeEach(()=>{
		datasetStore.reset();
		preferencesStore.reset();
		distanceMatricesStore.reset();
		render(
			<AppContextProvider value={rootStore}>
				<Header/>
				<Menu/>
			</AppContextProvider>
		);
		fireEvent.click(screen.getByRole("button",{name: "Salva/Carica sessione"}));
	});
	test("load session success", async () =>{
		const file = new File([JSON.stringify(json)], "test.json", { type: "application/json" });
		const data = mockData([file]);

		function dispatchEvt(node, type, data) {
			const event = new Event(type, { bubbles: true });
			Object.assign(event, data);
			fireEvent.drop(node, event);
		}

		function mockData(files) {
			return {
				dataTransfer: {
					files,
					items: files.map(file => ({
						kind: "file",
						type: file.type,
						getAsFile: () => file,
					})),
					types: ["Files"],
				},
			};
		}
		const inputEl = screen.getByTestId("drop-input");
		dispatchEvt(inputEl, "dragenter", data);
		await waitFor(() => {	
			expect(screen.getByRole("alert", "Sessione ripristinata correttamente")).toBeInTheDocument();
		});
		expect(datasetStore.originalData).toStrictEqual(dataset);
		expect(datasetStore.selectedData).toStrictEqual(dataset);
		expect(datasetStore.dimensions).toStrictEqual([dimension1, dimension2]);
		expect(distanceMatricesStore.distanceMatrices[0]).toStrictEqual(distanceMatrix);
		expect(preferencesStore.chart).toMatch("plma");
		
	});
	test("load session fail", async () =>{
		const file = new File([jsonWrong], "wrong.json", { type: "application/json" });
		const data = mockData([file]);

		function dispatchEvt(node, type, data) {
			const event = new Event(type, { bubbles: true });
			Object.assign(event, data);
			fireEvent.drop(node, event);
		}

		function mockData(files) {
			return {
				dataTransfer: {
					files,
					items: files.map(file => ({
						kind: "file",
						type: file.type,
						getAsFile: () => file,
					})),
					types: ["Files"],
				},
			};
		}
		const inputEl = screen.getByTestId("drop-input");
		dispatchEvt(inputEl, "dragenter", data);
		await waitFor(() => {
			expect(screen.getByText("Avviso")).toBeInTheDocument();
		});
	});
	test("export session", () => {
		datasetStore.loadData(dataset);
		datasetStore.loadDimensions([dimension1,dimension2]);
		datasetStore.updateSelectedData();
		distanceMatricesStore.addDistanceMatrix(distanceMatrix);
		preferencesStore.preferencesSpm.axis1="sepal";
		preferencesStore.preferencesSpm.axis2="petal";
		preferencesStore.chart="plma";
		preferencesStore.preferencesPlma.dimensions=["sepal", "petal"];
		preferencesStore.preferencesFf.distanceMatrix="euclidean";
		let text = JSON.stringify(rootStore);
		expect(text).toMatch(JSON.stringify(json));
	});
	test("change name", () => {
		const namebox = screen.getByRole("textbox");
		fireEvent.change(namebox,{target:{value: "prova"}});
		expect(namebox.value).toBe("prova");
	});
});