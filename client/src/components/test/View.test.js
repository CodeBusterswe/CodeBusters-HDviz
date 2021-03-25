import { createEvent, fireEvent, getByRole, getByText, render, screen, waitFor } from "@testing-library/react";
import App from "./../View";

test("Open web app", () => {
	render(<App />);
	expect(screen.getByRole("heading", { name: "HDViz" })).toBeInTheDocument();
});
test("Open and close CSV modal", async() => {
	render(<App />);
	fireEvent.click(screen.getByRole("button",{name: "Carica dati da CSV" }));
	await waitFor(() => {			
		expect(screen.getByRole("button", { name: "Torna al menù" })).toBeInTheDocument();
	});
	fireEvent.click(screen.getByRole("button", { name: "Torna al menù" }));
	
	await waitFor(() => {	
		expect(screen.getByRole("heading", { name: "HDViz" })).toBeInTheDocument();
	});
	
});

test("Carica dati da database",()=>{
	render(<App />);
	fireEvent.click(screen.getByRole("button",{name: "Carica dati dal DB" }));
	expect(screen.getByRole("button", { name: "Torna al menù" })).toBeInTheDocument();
	fireEvent.click(screen.getByRole("button",{name: "Conferma selezione" }));
});
