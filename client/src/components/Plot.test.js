import { createEvent, fireEvent, getByRole, getByText, render, screen, waitFor } from "@testing-library/react";
import App from "../App";

test("Scatterplot matrix", async() => {
	render(<App />);
	fireEvent.click(screen.getByRole("button",{name: "Scatterplot Matrix" }));
	await waitFor(() => {
		
		expect(screen.getByRole("combobox",{name: "Axis one" })).toBeInTheDocument()
		
	})
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis one" }),{key: "sepal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis two" }),{key: "sepal_width"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis Three" }),{key: "petal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis Four" }),{key: "petal_width"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Color" }),{key: "species"});
	screen.debug();
});

test("Adjacency matrix", async() => {
	jest.setTimeout(30000);
	render(<App />);
	fireEvent.click(screen.getByRole('button',{name: 'Calcola distanza' }));
	await waitFor(() => {
		(
			expect(screen.getByRole('button',{name: 'Start reduction' })).toBeInTheDocument()
		)
	})
	fireEvent.click(screen.getByRole('button', { name: 'Start reduction' }));
	await waitFor(() => {
		(
			expect(screen.getByRole("button",{name: "Adjacency Matrix" })).toBeInTheDocument()
		)
	})
	fireEvent.click(screen.getByRole("button",{name: "Adjacency Matrix" }));
	await waitFor(() => {
		
		expect(screen.getByRole("combobox",{name: "Distance Matrix" })).toBeInTheDocument()
		
	})
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Distance Matrix" }),{key: "euclidean"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Order by" }),{key: "petal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Labels" }),{key: "petal_width"});
});

test("Heat map", async() => {
	render(<App />);
	fireEvent.click(screen.getByRole("button",{name: "Heat Map" }));
	await waitFor(() => {
		
		expect(screen.getByRole("combobox",{name: "Axis X" })).toBeInTheDocument()
		
	})
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis X" }),{key: "sepal_length"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Axis Y" }),{key: "sepal_width"});
	fireEvent.keyDown(screen.getByRole("combobox",{name: "Heat" }),{key: "petal_length"});
	screen.debug();
});
