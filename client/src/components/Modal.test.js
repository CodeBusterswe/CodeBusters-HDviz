import { createEvent, fireEvent, getByRole, getByText, render, screen, waitFor } from "@testing-library/react";
import { Modal } from "react-bootstrap";
import App from "../App";

test("Carica un csv", async() => {
	render(<App/>);
	fireEvent.click(screen.getByRole('button',{name: 'Carica dati da CSV' }));
	await waitFor(() => {
			(
				expect(screen.getByText('Carica un file CSV')).toBeInTheDocument()
			)
	})
	const inputEl=screen.getByText('Carica un file CSV');
	fireEvent.drop(inputEl, {
		dataTransfer: {
		  files: [new File(['(id,group\n14,24)'], 'penguins.csv')],
		  },
	  });
	fireEvent.click(screen.getByRole('button',{name: 'Conferma selezione' }));
	await waitFor(() => {
			(
				expect(screen.getByRole('button',{name: 'Riduci dimensioni' })).toBeInTheDocument()
			)
	})
	fireEvent.click(screen.getByRole('button',{name: 'Riduci dimensioni' }));
	await waitFor(() => {
			(
				expect(screen.getByRole('button',{name: 'lezione' })).toBeInTheDocument()
			)
	})
	//expect(screen.getByRole('button',{name: 'lezione' })).toBeInTheDocument();	
	screen.debug();
});
/*test("Open and close Riduci dimensioni", () => {
	render(<App />);
	fireEvent.click(screen.getByRole('button',{name: 'Riduci dimensioni' }));
	const event=jest.fn(
		waitFor(() => {
			(
				screen.getByRole('button', { name: 'Torna al menù' })
			).toBeTruthy()
		})
	);
	expect(event).toBeTruthy();
	//fireEvent.click(event());
	fireEvent.click(screen.getByRole('button', { name: 'Torna al menù' }));
	const event2=jest.fn(
		waitFor(() => {
			(
				screen.getByRole('heading', { name: 'HDViz' })
			).toBeTruthy()
		})
	);
	expect(event2).toBeTruthy();
	screen.debug();
});
test("Scegli il grafico", () => {
	render(<App />);
	fireEvent.click(screen.getByRole('button',{name: 'Scegli il grafico' }));
	fireEvent.click(screen.getByRole('button', { name: 'Torna al menù' }));
	//waitFor(() => {expect(screen.getByRole('heading', { name: 'HDViz' })).toBeTruthy()});
	screen.debug();
});*/