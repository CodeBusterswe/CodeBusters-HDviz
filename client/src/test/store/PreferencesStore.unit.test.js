import RootStore from "./../../stores/RootStore";
import {AppContextProvider} from "./../../ContextProvider";
import Menu from "./../../components/UI/burgerMenuUI/Menu";
import Chart from "./../../components/UI/graphUI/Chart";
import Header from "./../../components/UI/headerUI/Header";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

let rootStore;

describe("Check that the user's preferences are correctly saved in the system", ()=>{
	
	rootStore = new RootStore();

	beforeEach(() => {
		render(
			<AppContextProvider value={rootStore}>
				<Header/>
				<Menu/>
				<Chart/>
			</AppContextProvider>
		);
		fireEvent.click(screen.getByRole("button",{name: "Carica un dataset di prova" }));		
	});

	test("SPM preferences", () => {
		fireEvent.click(screen.getByRole("button",{name: "Scatterplot Matrix"}));

		fireEvent.change(screen.getByRole("combobox",{name: "Asse uno"}),{target:{value: "sepal_length"}});
		fireEvent.change(screen.getByRole("combobox",{name: "Asse due"}),{target:{value: "petal_length"}});
		fireEvent.change(screen.getByRole("combobox",{name: "Asse tre"}),{target:{value: "sepal_width"}});
		fireEvent.change(screen.getByRole("combobox",{name: "Asse quattro"}),{target:{value: "petal_width"}});
		fireEvent.change(screen.getByRole("combobox",{name: "Colore"}),{target:{value: "species"}});

		let axes = rootStore.preferencesStore.preferencesSpm.axes;
		expect(axes).toStrictEqual(["sepal_length","petal_length","sepal_width","petal_width",undefined]);
	});

	test("PLMA preferences", () => {
		fireEvent.click(screen.getByRole("button",{name: "Linear Projection"}));

		fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value: "sepal_width"}});
		fireEvent.keyDown(screen.getByRole("textbox",{name:""}), { key: "Enter", code: "Enter" });
		fireEvent.change(screen.getByRole("combobox",{name: "Colore"}),{target:{value: "species"}});

		let dimensions = rootStore.preferencesStore.preferencesPlma.dimensions,
			color = rootStore.preferencesStore.preferencesPlma.color;
		
		expect(color).toBe("species");
		expect(dimensions).toStrictEqual(["sepal_width"]);
	});

	test("HM preferences", () => {
		fireEvent.click(screen.getByRole("button",{name: "Heat Map"}));

		fireEvent.change(screen.getByRole("combobox",{name: "Asse X"}),{target:{value: "sepal_length"}});
		fireEvent.change(screen.getByRole("combobox",{name: "Asse Y"}),{target:{value: "petal_length"}});
		fireEvent.change(screen.getByRole("combobox",{name: "Colore"}),{target:{value: "species"}});

		let asseX = rootStore.preferencesStore.preferencesHm.xAxis,
			asseY = rootStore.preferencesStore.preferencesHm.yAxis,
			heat = rootStore.preferencesStore.preferencesHm.heat;
		
		expect(asseX).toStrictEqual("sepal_length");
		expect(asseY).toStrictEqual("petal_length");
		expect(heat).toStrictEqual("species");
	});

	describe("charts that depend on the concept of distance", ()=>{

		beforeEach(() => {
			fireEvent.click(screen.getByRole("button",{name: "Calcola distanza" }));
			fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
			fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione"}));
		});
	
		test("FF preferences", async() => {

			await waitFor(() => {
				expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
			});

			fireEvent.click(screen.getByRole("button",{name: "Force Field"}));
	
			fireEvent.change(screen.getByRole("combobox",{name: "Matrice delle distanze"}),{target:{value: "test"}});
			fireEvent.change(screen.getByRole("combobox",{name: "Colore"}),{target:{value: "species"}});
			fireEvent.change(screen.getByRole("textbox",{name: "Distanza massima"}),{target:{value: 1}});
			fireEvent.change(screen.getByRole("textbox",{name: "Distanza minima"}),{target:{value: 0.5}});

			let matrix = rootStore.preferencesStore.preferencesFf.distanceMatrix,
				distMax = rootStore.preferencesStore.preferencesFf.distMax,
				distMin = rootStore.preferencesStore.preferencesFf.distMin,
				color = rootStore.preferencesStore.preferencesFf.color;
	
			expect(matrix).toStrictEqual("test");
			expect(distMax).toBe("1");
			expect(distMin).toBe("0.5");
			expect(color).toStrictEqual("species");				
		});

		test("AM preferences", async() => {

			await waitFor(() => {
				expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
			});

			fireEvent.click(screen.getByRole("button",{name: "Adjacency Matrix"}));
	
			fireEvent.change(screen.getByRole("combobox",{name: "Matrice delle distanze"}),{target:{value: "test"}});
			fireEvent.change(screen.getByRole("combobox",{name: "Ordine"}),{target:{value: "species"}});
			fireEvent.change(screen.getByRole("combobox",{name: "Etichette"}),{target:{value: "sepal_width"}});
			fireEvent.change(screen.getByRole("textbox",{name: "Distanza massima"}),{target:{value: 1}});
			fireEvent.change(screen.getByRole("textbox",{name: "Distanza minima"}),{target:{value: 0.5}});

			let matrix = rootStore.preferencesStore.preferencesAm.distanceMatrix,
				distMax = rootStore.preferencesStore.preferencesAm.distMax,
				distMin = rootStore.preferencesStore.preferencesAm.distMin,
				orderBy = rootStore.preferencesStore.preferencesAm.orderBy,
				label = rootStore.preferencesStore.preferencesAm.label;
	
			expect(matrix).toStrictEqual("test");
			expect(distMax).toBe("1");
			expect(distMin).toBe("0.5");
			expect(orderBy).toStrictEqual("species");	
			expect(label).toStrictEqual("sepal_width");				
		});
	});
});
