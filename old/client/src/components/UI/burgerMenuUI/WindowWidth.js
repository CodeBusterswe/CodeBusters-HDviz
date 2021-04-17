//? CON QUESTA IL POPOVER CAMBIA POSIZIONE A TOP ANCHE SE LA DIMENSIONE DELLA SCHERMATA CAMBIA NELLA STESSA SESSIONE
//? TIENE TRACCIA COSTANTEMENTE DELLA WIDTH (quindi cambia il valore se si ridimensiona la pagina)
import { useEffect, useState } from "react";

export function getWindowWidth() {
	const { innerWidth: width } = window;
	return {
		width
	};
}

export default function useWindowWidth() {
	const [windowWidth, setWindowWidth] = useState(
		getWindowWidth()
	);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(getWindowWidth());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowWidth;
} 