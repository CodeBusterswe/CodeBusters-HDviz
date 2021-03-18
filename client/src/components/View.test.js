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
test("Carica un csv",() => {
	render(<App/>);
	fireEvent.click(screen.getByRole('button',{name: 'Carica dati da CSV' }));
	const event=jest.fn(
		waitFor(() => {
			(
				screen.getByText('Carica un file CSV')
			)
		})
	);
	expect(event).toBeTruthy();
	const file = new File(['(⌐□_□)'], './penguins.csv', {
		type: 'csv',
	  })
	const inputEl = screen.getByText('Carica un file CSV');
	fireEvent.drop(inputEl, {
		DataTransfer:{files: [file]}
	});
  
	/*fireEvent.drop(screen.getByText('Carica un file CSV'), {
		DataTransfer: {
			files: [new File(['(⌐□_□)'], 'penguins.csv', { type: 'text' })]
		}
	})*/
	const event2=jest.fn(
		waitFor(() => {
			(
				screen.getByRole('button',{name: 'Conferma selezione' })
			)
		})
	);
	expect(event2).toBeTruthy();
	fireEvent.click(screen.getByRole('button',{name: 'Conferma selezione' }));
	const event3=jest.fn(
		waitFor(() => {
			(
				screen.getByRole('heading', { name: 'HDViz' })
			).toBeTruthy()
		})
	);
	/*expect(event3).toBeTruthy();
	fireEvent.click(screen.getByRole('button',{name: 'Riduci dimensioni' }));
	const event4=jest.fn(
		waitFor(() => {
			(
				screen.getByRole('button', { name: 'Conferma selezione' })
			).toBeTruthy()
		})
	);
	console.log(event4);*/
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