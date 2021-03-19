import { createEvent, fireEvent, getByRole, getByText, render, screen, waitFor } from "@testing-library/react";
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
	fireEvent.click(screen.getByRole('button', { name: 'Torna al menù' }));
	const event2=jest.fn(
		waitFor(() => {
			(
				screen.getByRole('heading', { name: 'HDViz' })
			).toBeTruthy()
		})
	);
	console.log(event2);
});
