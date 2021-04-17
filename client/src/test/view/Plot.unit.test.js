import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./../../components/View";

test("Scatterplot matrix", async() => {
	render(<App />);
	fireEvent.click(screen.getByRole("button",{name: "Scatterplot Matrix" }));
	expect(screen.getByRole("combobox",{name: "Axis one" })).toBeInTheDocument();	
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis one" }),{key: "sepal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis two" }),{key: "sepal_width"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis Three" }),{key: "petal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis Four" }),{key: "petal_width"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis Five" }),{key: "petal_width"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Color" }),{key: "species"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Color" }),{key: "petal_width"});
	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));
	
});

test("Adjacency matrix", async() => {
	
	render(<App />);
	fireEvent.click(screen.getByRole("button",{name: "Calcola distanza" }));
	expect(screen.getByRole("button",{name: "Start reduction" })).toBeInTheDocument();
	
	fireEvent.click(screen.getByRole("button", { name: "Start reduction" }));
	await waitFor(()=>{	
		expect(screen.getByRole("button",{name: "Adjacency Matrix" })).toBeInTheDocument();
	});
	fireEvent.click(screen.getByRole("button",{name: "Adjacency Matrix" }));
		
	expect(screen.getByRole("combobox",{name: "Distance Matrix" })).toBeInTheDocument();
	
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Distance Matrix" }),{key: "euclidean"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Order by" }),{key: "petal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Labels" }),{key: "petal_width"});
	fireEvent.change(screen.getByRole("textbox",{name:"Max Distance:"}),{target:{value:"3"}});
	fireEvent.change(screen.getByRole("textbox",{name:"MinDistance:"}),{target:{value:"1"}});
	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));
},30000);

test("Heat map", () => {
	render(<App />);
	fireEvent.click(screen.getByRole("button",{name: "Heat Map" }));
		
	expect(screen.getByRole("combobox",{name: "Axis X" })).toBeInTheDocument();
	
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis X" }),{key: "sepal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis Y" }),{key: "sepal_width"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Heat" }),{key: "petal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Heat" }),{key: "species"});

	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));
},30000);

test("Force field", async() => {
	render(<App />);
	fireEvent.click(screen.getByRole("button",{name: "Calcola distanza" }));
		
	expect(screen.getByRole("button",{name: "Start reduction" })).toBeInTheDocument();
	
	fireEvent.click(screen.getByRole("button", { name: "Start reduction" }));
	await waitFor(()=>{
		expect(screen.getByRole("button",{name: "Force Field" })).toBeInTheDocument();
	});
	fireEvent.click(screen.getByRole("button",{name: "Force Field" }));
		
	expect(screen.getByRole("combobox",{name: "Distance Matrix" })).toBeInTheDocument();
	
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Distance Matrix" }),{key: "euclidean"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Color" }),{key: "Group"});
	fireEvent.change(screen.getByRole("textbox",{name:"Max Distance:"}),{target:{value:"3"}});
	fireEvent.change(screen.getByRole("textbox",{name:"MinDistance:"}),{target:{value:"1"}});
	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));
},30000);

test("Linear Projection", async()=>{
	render (<App/>);
	fireEvent.click(screen.getByRole("button",{name: "Linear Projection"}));
	expect(screen.getByRole("option",{name:"sepal_length"})).toBeInTheDocument();
	fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value:"petal_width"}});
	fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value:"petal_length"}});
	fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value:"sepal_width"}});
	fireEvent.change(screen.getByRole("textbox",{name:""}),{target:{value:"sepal_length"}});
	fireEvent.click(screen.getByRole("combobox",{name:"Color"}),{key:"species"});
	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));
});
