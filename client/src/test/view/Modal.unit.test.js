import { fireEvent, getByText, render, screen, waitFor } from "@testing-library/react";
import App from "./../../components/View";

describe("Caricamento dei dati tramite CSV",() =>{
	beforeEach(()=>{
		render(<App/>);
		fireEvent.click(screen.getByRole("button",{name: "Carica dati da CSV" }));
		expect(screen.getByText("Carica un file CSV")).toBeInTheDocument();
	});
	test("Carica un csv", async() => {
		const inputEl=screen.getByText("Carica un file CSV");
		fireEvent.drop(inputEl, {
			dataTransfer: {
				files: [new File(["(id,group\n14,24)"], "penguins.csv")],
			},
		});
		fireEvent.click(screen.getByRole("button",{name: "Conferma selezione" }));
		await waitFor(() => {
			
			expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
			
		});
	},30000);
	test("Seleziona le dimensioni",()=>{
		expect(screen.getByRole("checkbox",{name: "petal_length" })).toBeChecked();
		expect(screen.getByRole("checkbox",{name: "petal_width" })).toBeChecked();
		fireEvent.click(screen.getByRole("checkbox",{name: "petal_length" }));
		fireEvent.click(screen.getByRole("checkbox",{name: "petal_width" }));
		expect(screen.getByRole("checkbox",{name: "petal_length" })).not.toBeChecked();
		expect(screen.getByRole("checkbox",{name: "petal_width" })).not.toBeChecked();		
	});
});

describe("Riduci le dimensioni", ()=>{
	beforeEach(()=>{
		render(<App />);
		fireEvent.click(screen.getByRole("button",{name: "Riduci dimensioni" }));	
		expect(screen.getByRole("button",{name: "Start reduction" })).toBeInTheDocument();
	});
	afterEach( async() => {
		fireEvent.click(screen.getByRole("button", { name: "Start reduction" }));
		await waitFor(() => {
		
			expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
			
		});
	});
	test("Seleziona LLE",()=>{
		fireEvent.change(screen.getByRole("combobox",{name:"Select algorithm"}),{target:{value:"lle"}});
		fireEvent.change(screen.getByRole("textbox",{name:"New dimensions name"}),{target:{value: "test1"}});
		fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value: "5"}});
		expect(screen.getByText("LLE")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"New dimensions name"}).value).toBe("test1");
		expect(screen.getByRole("textbox",{name:""}).value).toBe("5");
	});
	test("Seleziona FASTMAP",()=>{
		fireEvent.change(screen.getByRole("combobox",{name:"Select algorithm"}),{target:{value:"fastMap"}});
		fireEvent.change(screen.getByRole("textbox",{name:"New dimensions name"}),{target:{value: "test2"}});
		fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value: "5"}});
		expect(screen.getByText("FASTMAP")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"New dimensions name"}).value).toBe("test2");
		expect(screen.getByRole("textbox",{name:""}).value).toBe("5");
	});
	test("Seleziona ISOMAP",()=>{
		fireEvent.change(screen.getByRole("combobox",{name:"Select algorithm"}),{target:{value:"isoMap"}});
		fireEvent.change(screen.getByRole("textbox",{name:"New dimensions name"}),{target:{value: "test3"}});
		fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value: "5"}});
		expect(screen.getByText("ISOMAP")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"New dimensions name"}).value).toBe("test3");
		expect(screen.getByRole("textbox",{name:""}).value).toBe("5");
	});
	test("Seleziona TSNE",()=>{
		fireEvent.change(screen.getByRole("combobox",{name:"Select algorithm"}),{target:{value:"t-sne"}});
		fireEvent.change(screen.getByRole("textbox",{name:"New dimensions name"}),{target:{value: "test4"}});
		fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value: "5"}});
		expect(screen.getByText("TSNE")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"New dimensions name"}).value).toBe("test4");
		expect(screen.getByRole("textbox",{name:""}).value).toBe("5");
	});
	
});
describe("Calcola distanza", ()=>{
	beforeEach(()=>{
		render(<App />);
		fireEvent.click(screen.getByRole("button",{name: "Calcola distanza" }));
		expect(screen.getByRole("button",{name: "Start reduction" })).toBeInTheDocument();
	});
	afterEach( async() => {
		fireEvent.click(screen.getByRole("button", { name: "Start reduction" }));
		await waitFor(() => {
		
			expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
			
		});
	});
	test("Seleziona EUCLIDEAN",()=>{
		fireEvent.keyDown(screen.getByRole("combobox",{name:"Select distance type"},{key:"EUCLIDEAN"}));
		fireEvent.change(screen.getByRole("textbox",{name:"Distances matrix name"}),{target:{value: "test1"}});
		expect(screen.getByText("EUCLIDEAN")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Distances matrix name"}).value).toBe("test1");
	});
	test("Seleziona CANBERRA",()=>{
		fireEvent.keyDown(screen.getByRole("combobox",{name:"Select distance type"},{key:"CANBERRA"}));
		fireEvent.change(screen.getByRole("textbox",{name:"Distances matrix name"}),{target:{value: "test1"}});
		expect(screen.getByText("CANBERRA")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Distances matrix name"}).value).toBe("test1");
	});
	test("Seleziona CHEBYSHEV",()=>{
		fireEvent.keyDown(screen.getByRole("combobox",{name:"Select distance type"},{key:"CHEBYSHEV"}));
		fireEvent.change(screen.getByRole("textbox",{name:"Distances matrix name"}),{target:{value: "test1"}});
		expect(screen.getByText("CHEBYSHEV")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Distances matrix name"}).value).toBe("test1");
	});
	test("Seleziona MANHATTAN",()=>{
		fireEvent.keyDown(screen.getByRole("combobox",{name:"Select distance type"},{key:"MANHATTAN"}));
		fireEvent.change(screen.getByRole("textbox",{name:"Distances matrix name"}),{target:{value: "test1"}});
		expect(screen.getByText("MANHATTAN")).toBeInTheDocument();
		expect(screen.getByRole("textbox",{name:"Distances matrix name"}).value).toBe("test1");
	});
	
});
