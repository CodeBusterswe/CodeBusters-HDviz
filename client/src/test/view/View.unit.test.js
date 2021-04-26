import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./../../components/View";

beforeEach(()=>{
	render(<App />);
});

test("check render view", () => {
	const header = document.getElementsByClassName("App-header"),
		menu = document.getElementsByClassName("navbar"),
		content = document.getElementsByClassName("content");

	expect(header[0]).toBeInTheDocument();
	expect(menu[0]).toBeInTheDocument();
	expect(content[0]).toBeInTheDocument();
});

test("Open and close CSV modal", async() => {
	fireEvent.click(screen.getByRole("button",{name: "Carica dati da CSV" }));
	await waitFor(() => {			
		expect(screen.getByRole("button", { name: "Torna al menù" })).toBeInTheDocument();
	});
	fireEvent.click(screen.getByRole("button", { name: "Torna al menù" }));
	
	await waitFor(() => {	
		expect(screen.getByRole("heading", { name: "HDViz" })).toBeInTheDocument();
	});
	
});

test("Aiuti all'utente",()=>{
	fireEvent.click(screen.getByRole("button",{name: "Guida introduttiva" }));
	expect(screen.getByText("Guida introduttiva all'utilizzo di HDViz")).toBeInTheDocument();
	fireEvent.click(screen.getByRole("button",{name: "Torna al menù" }));
});

test("Si verifica che venga visualizzato un messaggio d'errore se i dati non sono stati inseriti nel sistema", async() => {
	fireEvent.click(screen.getByRole("button",{name: "Carica dati da CSV" }));
	await waitFor(() => {			
		expect(screen.getByRole("button", { name: "Torna al menù" })).toBeInTheDocument();
	});
	fireEvent.click(screen.getByRole("button",{name: "Torna al menù" }));
	await waitFor(() => {	
		expect(screen.getByText("Avviso")).toBeInTheDocument();
	});
});