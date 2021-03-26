import { createEvent, fireEvent, getByRole, getByText, render, screen, waitFor } from "@testing-library/react";
import { Modal } from "react-bootstrap";
import App from "./../View";

test("Carica un csv", async() => {
	render(<App/>);
	fireEvent.click(screen.getByRole("button",{name: "Carica dati da CSV" }));
		
	expect(screen.getByText("Sostituisci il file CSV caricato")).toBeInTheDocument();
	
	const inputEl=screen.getByText("Sostituisci il file CSV caricato");
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
test("Open and redux dimension", async () => {
	render(<App />);
	fireEvent.click(screen.getByRole("button",{name: "Riduci dimensioni" }));
		
	expect(screen.getByRole("button",{name: "Start reduction" })).toBeInTheDocument();
	
	fireEvent.click(screen.getByRole("button", { name: "Start reduction" }));
	await waitFor(() => {
		
		expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
		
	});
},30000);
test("Calcola distanza", async() => {
	render(<App />);
	fireEvent.click(screen.getByRole("button",{name: "Calcola distanza" }));
		
	expect(screen.getByRole("button",{name: "Start reduction" })).toBeInTheDocument();
	
	fireEvent.click(screen.getByRole("button", { name: "Start reduction" }));
	await waitFor(() => {
		
		expect(screen.getByRole("heading",{name: "HDViz" })).toBeInTheDocument();
		
	});
},30000);
