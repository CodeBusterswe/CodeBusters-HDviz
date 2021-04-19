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
	
	fireEvent.change(screen.getByRole("combobox",{name: "Distance Matrix" }),{target:{value: "euclidean"}});
	fireEvent.change(screen.getByRole("combobox",{name: "Order by" }),{target:{value: "petal_length"}});
	fireEvent.change(screen.getByRole("combobox",{name: "Labels" }),{target:{value: "petal_width"}});
	fireEvent.change(screen.getByRole("textbox",{name:"Max Distance: 3.7161808352124095"}),{target:{value:"3"}});
	fireEvent.change(screen.getByRole("textbox",{name:"MinDistance: 0"}),{target:{value:"1"}});
	expect(screen.getByText("euclidean")).toBeInTheDocument();
	
	expect(screen.getByRole("textbox",{name: "Max Distance: 3.7161808352124095" }).value).toBe("3");
	expect(screen.getByRole("textbox",{name: "MinDistance: 0" }).value).toBe("1");
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
	//expect(screen.getByText("sepal_length")).toBe("sepal_length");
	//expect(screen.getByText("sepal_width")).toBeInTheDocument();
	//expect(screen.getByText("petal_length")).toBeInTheDocument();
	//expect(screen.getByText("species")).toBeInTheDocument();
	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));
},30000);

test("Force field", async() => {
	render(<App />);
	fireEvent.click(screen.getByRole("button",{name: "Calcola distanza" }));
		
	expect(screen.getByRole("button",{name: "Start reduction" })).toBeInTheDocument();
	
	fireEvent.click(screen.getByRole("button", { name: "Start reduction" }));
	await waitFor(()=>{
		expect(screen.getByRole("button",{name: "Force Field" })).toBeInTheDocument();
	},10000);
	fireEvent.click(screen.getByRole("button",{name: "Force Field" }));
		
	expect(screen.getByRole("combobox",{name: "Distance Matrix" })).toBeInTheDocument();
	
	fireEvent.change(screen.getByRole("combobox",{name: "Distance Matrix" }),{target:{value: "euclidean"}});
	fireEvent.change(screen.getByRole("combobox",{name: "Color" }),{target:{value: "sepal_length"}});
	fireEvent.change(screen.getByRole("textbox",{name:"Max Distance: 3.7161808352124095"}),{target:{value:"3"}});
	fireEvent.change(screen.getByRole("textbox",{name:"MinDistance: 0"}),{target:{value:"1"}});
	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));

	expect(screen.getByText("euclidean")).toBeInTheDocument();
	expect(screen.getByText("sepal_length")).toBeInTheDocument();
	expect(screen.getByRole("textbox",{name: "Max Distance: 3.7161808352124095"}).value).toBe("3");
	expect(screen.getByRole("textbox",{name: "MinDistance: 0" }).value).toBe("1");
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
	//expect(screen.getByText("petal_width")).toBeInTheDocument();
	//expect(screen.getByText("petal_length")).toBeInTheDocument();
	//expect(screen.getByText("sepal_width")).toBeInTheDocument();
	//expect(screen.getAllByText("sepal_length")).toBeInTheDocument();
	//expect(screen.getByText("species")).toBeInTheDocument();
	fireEvent.click(screen.getByRole("button",{name: "Nascondi preferenze"}));
});
