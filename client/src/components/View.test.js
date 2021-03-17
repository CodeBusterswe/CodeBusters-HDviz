import { createEvent, fireEvent, getByRole, getByText, render, screen, waitFor } from "@testing-library/react";
import { Modal } from "react-bootstrap";
import App from "../App";
test("Open web app", () => {
	render(<App />);
	expect(screen.getByRole('heading', { name: 'HDViz' })).toBeTruthy();
	screen.debug();
});
test("Open and close CSV modal", () => {
	render(<App />);
	fireEvent.click(screen.getByRole('button',{name: 'Carica dati da CSV' }));
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