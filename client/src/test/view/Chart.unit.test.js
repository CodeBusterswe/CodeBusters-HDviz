import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RootStore from "./../../stores/RootStore";
import {AppContextProvider} from "./../../ContextProvider";
import Menu from "./../../components/UI/burgerMenuUI/Menu";
import Chart from "./../../components/UI/graphUI/Chart";
import Header from "./../../components/UI/headerUI/Header";

describe("render chart", () => {
	const rootStore = new RootStore();
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

	test("render scatter plot matrix", async() => {
		await waitFor(() => {
			expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
		});
		fireEvent.click(screen.getByRole("button",{name: "Scatterplot Matrix"}));
		fireEvent.change(screen.getByRole("combobox",{name: "Asse uno"}),{target:{value: "sepal_length"}});
		fireEvent.change(screen.getByRole("combobox",{name: "Asse due"}),{target:{value: "petal_length"}});
		await waitFor(() => {
			expect(document.getElementsByTagName("rect")[1]).toBeInTheDocument();
			expect(document.getElementsByTagName("rect")[1].__data__.x).toBe("sepal_length");
			expect(document.getElementsByTagName("rect")[1].__data__.y).toBe("petal_length");
		});
	});
	describe("charts that depend on the concept of distance", ()=>{

		beforeEach(() => {
			fireEvent.click(screen.getByRole("button",{name: "Calcola distanza" }));
			fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test"}});
			fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione"}));
		});
		test("render adjacency matrix", async() => {
			await waitFor(() => {
				expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
			});
			fireEvent.click(screen.getByRole("button",{name: "Adjacency Matrix"}));
			fireEvent.change(screen.getByRole("combobox",{name: "Matrice delle distanze"}),{target:{value: "test"}});
			await waitFor(() => {
				expect(document.getElementsByTagName("text")[0]).toBeInTheDocument();
			});
        
		});
		test("render force field", async() => {
			await waitFor(() => {
				expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
			});
			fireEvent.click(screen.getByRole("button",{name: "Force Field"}));
			fireEvent.change(screen.getByRole("combobox",{name: "Matrice delle distanze"}),{target:{value: "test"}});
			await waitFor(() => {
				expect(document.getElementsByTagName("canvas")[0]).toBeInTheDocument();
			});
        
		});
	});
	test("render heat map", async() => {
		await waitFor(() => {
			expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
		});
		fireEvent.click(screen.getByRole("button",{name: "Heat Map"}));
		fireEvent.change(screen.getByRole("combobox",{name: "Asse X"}),{target:{value: "sepal_length"}});
		await waitFor(() => {
			expect(document.getElementsByTagName("rect")[0]).toBeInTheDocument();
		});
        
	});
	test("render plma", async() => {
		await waitFor(() => {
			expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
		});
		fireEvent.click(screen.getByRole("button",{name: "Linear Projection"}));
		fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value: "sepal_width"}});
		fireEvent.keyDown(screen.getByRole("textbox",{name:""}), { key: "Enter", code: "Enter" });
		await waitFor(() => {
			expect(document.getElementsByTagName("circle")[0]).toBeInTheDocument();
		});
        
	});
});