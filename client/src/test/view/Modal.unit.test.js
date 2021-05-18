import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./../../components/View";
import RootStore from "../../stores/RootStore";
import {AppContextProvider} from "../../ContextProvider";
import Menu from "../../components/UI/burgerMenuUI/Menu";
import Header from "../../components/UI/headerUI/Header";

test("Carica dataset di prova",()=>{
	render(<App/>);
	fireEvent.click(screen.getByRole("button",{name: "Carica un dataset di prova" }));	
	expect(screen.getByRole("alert", "Dati inseriti correttamente")).toBeInTheDocument();
});
test("Carica un csv", async() => {
	const rootStore = new RootStore();
	render(
		<AppContextProvider value={rootStore}>
			<Header/>
			<Menu/>
		</AppContextProvider>
	);
	fireEvent.click(screen.getByRole("button",{name: "Carica dati da CSV" }));
	const file = new File(["id,group,name\n14,24,aldo\nNaN,,giovanni\n15,NaN,arturo"], "test.csv");
	const inputEl= screen.getByText("Rilascia qui il tuo file CSV o clicca per caricare").closest("div");
	
	fireEvent.drop(inputEl, {
		dataTransfer: {
			files: [file]
		}
	});
		
	await waitFor(() => {	
		expect(screen.getByRole("checkbox",{name: "id" })).toBeChecked();
	});
	fireEvent.click(screen.getByRole("checkbox",{name: "group" }));
	expect(screen.getByRole("checkbox",{name: "group" })).not.toBeChecked();
	await new Promise((r) => setTimeout(r, 2000));//serve per evitare l'errore dell'unmount object
	fireEvent.click(screen.getByRole("button",{name: "Conferma selezione" }));
	await waitFor(() => {	
		expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
	});
	expect(rootStore.datasetStore.dimensions.length).toBe(3);
	expect(rootStore.datasetStore.checkedDimensions.length).toBe(2);
	
});
describe("Riduci le dimensioni", ()=>{
	beforeEach(()=>{
		render(<App />);
		fireEvent.click(screen.getByRole("button",{name: "Carica un dataset di prova" }));	
		fireEvent.click(screen.getByRole("button",{name: "Riduci dimensioni" }));	
	});

	/*afterEach( async() => {
		fireEvent.click(screen.getByRole("button", { name: "Esegui riduzione" }));
		
		await waitFor(() => {
			expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
		});
		
		fireEvent.click(screen.getByRole("button",{name: "Scatterplot Matrix"}));
		fireEvent.keyDown(screen.getByRole("combobox",{name: "Asse uno" }),{key: "test"});
	}, 30000);*/

	test("Seleziona LLE",()=>{
		fireEvent.change(screen.getByRole("combobox",{name:"Algoritmo"}),{target:{value:"lle"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}),{target:{value: "test"}});
		fireEvent.change(screen.getByDisplayValue("2"),{target:{value:5}});
		fireEvent.change(screen.getByDisplayValue("30"),{target:{value:35}});
		expect(screen.getByText("LLE")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}).value).toBe("test");
		expect(screen.getByDisplayValue("5").value).toBe("5");
		expect(screen.getByDisplayValue("35").value).toBe("35");
	});
	test("Seleziona FASTMAP",()=>{
		fireEvent.change(screen.getByRole("combobox",{name:"Algoritmo"}),{target:{value:"fastMap"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}),{target:{value: "test"}});
		fireEvent.change(screen.getByRole("slider",{name:""}),{target:{value: "5"}});
		expect(screen.getByText("FASTMAP")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}).value).toBe("test");
		expect(screen.getByRole("slider",{name:""}).value).toBe("5");
	});

	test("Seleziona PCA",()=>{
		fireEvent.change(screen.getByRole("combobox",{name:"Algoritmo"}),{target:{value:"pca"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}),{target:{value: "test"}});
		fireEvent.change(screen.getByRole("slider",{name:""}),{target:{value: "5"}});
		expect(screen.getByText("PCA")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}).value).toBe("test");
		expect(screen.getByRole("slider",{name:""}).value).toBe("5");
	});
	test("Seleziona ISOMAP",()=>{
		fireEvent.change(screen.getByRole("combobox",{name:"Algoritmo"}),{target:{value:"isoMap"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}),{target:{value: "test"}});
		fireEvent.change(screen.getByDisplayValue("2"),{target:{value:5}});
		fireEvent.change(screen.getByDisplayValue("30"),{target:{value:35}});
		expect(screen.getByText("ISOMAP")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}).value).toBe("test");
		expect(screen.getByDisplayValue("5").value).toBe("5");
		expect(screen.getByDisplayValue("35").value).toBe("35");
	});
	test("Seleziona TSNE", async()=>{
		fireEvent.change(screen.getByRole("combobox",{name:"Algoritmo"}),{target:{value:"t-sne"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}),{target:{value: "test"}});
		fireEvent.change(screen.getByDisplayValue("2"),{target:{value:5}});
		fireEvent.change(screen.getByDisplayValue("50"),{target:{value:35}});
		fireEvent.change(screen.getByDisplayValue("10"),{target:{value:30}});
		expect(screen.getByText("TSNE")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}).value).toBe("test");
		expect(screen.getByDisplayValue("5").value).toBe("5");
		expect(screen.getByDisplayValue("35").value).toBe("35");
		expect(screen.getByDisplayValue("30").value).toBe("30");
	});
	test("Seleziona UMAP", async()=>{
		fireEvent.change(screen.getByRole("combobox",{name:"Algoritmo"}),{target:{value:"umap"}});
		fireEvent.change(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}),{target:{value: "test"}});
		fireEvent.change(screen.getByDisplayValue("5"),{target:{value:35}});
		fireEvent.change(screen.getByDisplayValue("2"),{target:{value:5}});
		fireEvent.change(screen.getByDisplayValue("0.5"),{target:{value:0.95}});
		fireEvent.change(screen.getByDisplayValue("30"),{target:{value:75}});
		expect(screen.getByText("UMAP")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Nome nuove dimensioni"}).value).toBe("test");
		expect(screen.getByDisplayValue("35").value).toBe("35");
		expect(screen.getByDisplayValue("5").value).toBe("5");
		expect(screen.getByDisplayValue("0.95").value).toBe("0.95");
		expect(screen.getByDisplayValue("75").value).toBe("75");
	});
	
});

describe("Calcola distanza", ()=>{
	beforeEach(()=>{
		render(<App />);
		fireEvent.click(screen.getByRole("button",{name: "Carica un dataset di prova" }));	
		fireEvent.click(screen.getByRole("button",{name: "Calcola distanza" }));
		expect(screen.getByRole("button",{name: "Esegui riduzione" })).toBeInTheDocument();
	});
	/*afterEach( async() => {
		fireEvent.click(screen.getByRole("button", { name: "Esegui riduzione" }));
		
		await waitFor(() => {
			expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();		
		});

		fireEvent.click(screen.getByRole("button",{name: "Scatterplot Matrix"}));
		fireEvent.keyDown(screen.getByRole("combobox",{name: "Asse uno" }),{key: "test1"});
	});*/
	test("Seleziona EUCLIDEAN",()=>{
		fireEvent.keyDown(screen.getByRole("combobox",{name:"Tipo di distanza"},{key:"EUCLIDEA"}));
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test1"}});
		expect(screen.getByText("EUCLIDEA")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}).value).toBe("test1");
	});
	test("Seleziona CANBERRA",()=>{
		fireEvent.keyDown(screen.getByRole("combobox",{name:"Tipo di distanza"},{key:"CANBERRA"}));
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test1"}});
		expect(screen.getByText("CANBERRA")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}).value).toBe("test1");
	});
	test("Seleziona CHEBYSHEV",()=>{
		fireEvent.keyDown(screen.getByRole("combobox",{name:"Tipo di distanza"},{key:"CHEBYSHEV"}));
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test1"}});
		expect(screen.getByText("CHEBYSHEV")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}).value).toBe("test1");
	});
	test("Seleziona MANHATTAN",()=>{
		fireEvent.keyDown(screen.getByRole("combobox",{name:"Tipo di distanza"},{key:"MANHATTAN"}));
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "test1"}});
		expect(screen.getByText("MANHATTAN")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}).value).toBe("test1");
	});
	
});
