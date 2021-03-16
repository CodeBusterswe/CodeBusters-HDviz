import { fireEvent, getByRole, getByText, render, screen, waitFor } from "@testing-library/react";
import { Modal } from "react-bootstrap";
import App from "./App";
test("Open web app", () => {
	render(<App />);
	expect(screen.getByRole('heading', { name: 'HDViz' })).toBeTruthy();
	screen.debug();
});
test("Open and close CSV modal", () => {
	render(<App />);
	fireEvent.click(screen.getByRole('button',{name: /Carica dati da CSV/i }));
	fireEvent.click(screen.getByRole('button', { name: /Torna al menù/i }));
	waitFor(() => {expect(screen.getByRole('heading', { name: 'HDViz' })).toBeTruthy()});
	screen.debug();
});
test("Open and close Riduci dimensioni", () => {
	render(<App />);
	fireEvent.click(screen.getByRole('button',{name: /Riduci dimensioni/i }));
	fireEvent.click(screen.getByRole('button', { name: /Torna al menù/i }));
	waitFor(() => {expect(screen.getByRole('heading', { name: 'HDViz' })).toBeTruthy()});
	screen.debug();
});
test("Scegli il grafico", () => {
	render(<App />);
	fireEvent.click(screen.getByRole('button',{name: /Scegli il grafico/i }));
	fireEvent.click(screen.getByRole('button', { name: /Torna al menù/i }));
	waitFor(() => {expect(screen.getByRole('heading', { name: 'HDViz' })).toBeTruthy()});
	screen.debug();
});