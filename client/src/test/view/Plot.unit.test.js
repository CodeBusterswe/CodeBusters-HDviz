import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./../../components/View";

beforeEach(()=>{
	render(<App />);
	fireEvent.click(screen.getByRole("button",{name: "Carica un dataset di prova" }));
});

test("Scatterplot matrix", async() => {
	fireEvent.click(screen.getByRole("button",{name: "Scatterplot Matrix" }));
	expect(screen.getByRole("combobox",{name: "Asse uno:" })).toBeInTheDocument();	
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Asse uno:" }),{key: "sepal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Asse due:" }),{key: "sepal_width"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Asse tre:" }),{key: "petal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Asse quattro:" }),{key: "petal_width"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Asse cinque:" }),{key: "petal_width"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Colore:" }),{key: "species"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Colore:" }),{key: "petal_width"});
	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));
	
});

test("Adjacency matrix", async() => {
	fireEvent.click(screen.getByRole("button",{name: "Calcola distanza" }));
	expect(screen.getByRole("button",{name: "Esegui riduzione" })).toBeInTheDocument();
	
	fireEvent.click(screen.getByRole("button", { name: "Esegui riduzione" }));
	await waitFor(()=>{	
		expect(screen.getByRole("button",{name: "Adjacency Matrix" })).toBeInTheDocument();
	});
	fireEvent.click(screen.getByRole("button",{name: "Adjacency Matrix" }));
		
	expect(screen.getByRole("combobox",{name: "Matrice delle distanze:" })).toBeInTheDocument();
	
	fireEvent.change(screen.getByRole("combobox",{name: "Matrice delle distanze:" }),{target:{value: "euclidean"}});
	fireEvent.change(screen.getByRole("combobox",{name: "Ordine:" }),{target:{value: "petal_length"}});
	fireEvent.change(screen.getByRole("combobox",{name: "Etichette:" }),{target:{value: "petal_width"}});
	fireEvent.change(screen.getByRole("textbox",{name:"Distanza massima: 3.7161808352124095"}),{target:{value:"3"}});
	fireEvent.change(screen.getByRole("textbox",{name:"Distanza minima: 0"}),{target:{value:"1"}});
	expect(screen.getByText("euclidean")).toBeInTheDocument();
	
	expect(screen.getByRole("textbox",{name: "Distanza massima: 3.7161808352124095" }).value).toBe("3");
	expect(screen.getByRole("textbox",{name: "Distanza minima: 0" }).value).toBe("1");
	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));
},30000);

test("Heat map", () => {
	fireEvent.click(screen.getByRole("button",{name: "Heat Map" }));
		
	expect(screen.getByRole("combobox",{name: "Asse X:" })).toBeInTheDocument();
	
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Asse X:" }),{key: "sepal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Asse Y:" }),{key: "sepal_width"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Colore:" }),{key: "petal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Colore:" }),{key: "species"});
	//expect(screen.getByText("sepal_length")).toBe("sepal_length");
	//expect(screen.getByText("sepal_width")).toBeInTheDocument();
	//expect(screen.getByText("petal_length")).toBeInTheDocument();
	//expect(screen.getByText("species")).toBeInTheDocument();
	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));
},30000);

test("Force field", async() => {
	fireEvent.click(screen.getByRole("button",{name: "Calcola distanza" }));
		
	expect(screen.getByRole("button",{name: "Esegui riduzione" })).toBeInTheDocument();
	
	fireEvent.click(screen.getByRole("button", { name: "Esegui riduzione" }));
	await waitFor(()=>{
		expect(screen.getByRole("button",{name: "Force Field" })).toBeInTheDocument();
	},10000);
	fireEvent.click(screen.getByRole("button",{name: "Force Field" }));
		
	expect(screen.getByRole("combobox",{name: "Matrice delle distanze:" })).toBeInTheDocument();
	
	fireEvent.change(screen.getByRole("combobox",{name: "Matrice delle distanze:" }),{target:{value: "euclidean"}});
	fireEvent.change(screen.getByRole("combobox",{name: "Colore:" }),{target:{value: "sepal_length"}});
	fireEvent.change(screen.getByRole("textbox",{name:"Distanza massima: 3.7161808352124095"}),{target:{value:"3"}});
	fireEvent.change(screen.getByRole("textbox",{name:"Distanza minima: 0"}),{target:{value:"1"}});
	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));

	expect(screen.getByText("euclidean")).toBeInTheDocument();
	expect(screen.getByText("sepal_length")).toBeInTheDocument();
	expect(screen.getByRole("textbox",{name: "Distanza massima: 3.7161808352124095"}).value).toBe("3");
	expect(screen.getByRole("textbox",{name: "Distanza minima: 0" }).value).toBe("1");
},30000);

test("Linear Projection", async()=>{
	fireEvent.click(screen.getByRole("button",{name: "Linear Projection"}));
	expect(screen.getByRole("option",{name:"sepal_length"})).toBeInTheDocument();
	fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value:"petal_width"}});
	fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value:"petal_length"}});
	fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value:"sepal_width"}});
	fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value:"sepal_length"}});
	fireEvent.click(screen.getByRole("combobox",{name:"Colore"}),{key:"species"});
	//expect(screen.getByText("petal_width")).toBeInTheDocument();
	//expect(screen.getByText("petal_length")).toBeInTheDocument();
	//expect(screen.getByText("sepal_width")).toBeInTheDocument();
	//expect(screen.getAllByText("sepal_length")).toBeInTheDocument();
	//expect(screen.getByText("species")).toBeInTheDocument();
	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));
});
