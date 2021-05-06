import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {api} from "../components/UI/burgerMenuUI/ModalContent/services/ApiURL";
import Header from "../components/UI/headerUI/Header";
import {AppContextProvider} from "../ContextProvider";
import Menu from "../components/UI/burgerMenuUI/Menu";
import selectEvent from "react-select-event";
import RootStore from "../stores/RootStore";

const rootStore = new RootStore();
const datasetStore = rootStore.datasetStore;

beforeEach(()=>{
	datasetStore.reset();
	render(
		<AppContextProvider value={rootStore}>
			<Header/>
			<Menu/>
		</AppContextProvider>
	);
});
test("check error if server is offline", () => {
	fireEvent.click(screen.getByRole("button",{name: "Carica dati dal DB" }));
	expect(screen.getByText("Assicurati di aver acceso il server...")).toBeInTheDocument();
});
describe("server is online", ()=>{
	const mockedTables = {data:[{ table_name: "iris" },{ table_name: "pinguino" }]};
	const mockedColumns = {data:[{ column_name: "sepal_length", data_type: "double precision" },
		{ column_name: "sepal_width", data_type: "double precision" },
		{ column_name: "petal_length", data_type: "double precision" },
		{ column_name: "petal_width", data_type: "double precision" },
		{ column_name: "species", data_type: "character varying" }]};
	const mockedData = {data:[{sepal_width: 5.1, petal_length: 3},
		{sepal_width: 5.3, petal_length: 2},
		{sepal_width: 3.4, petal_length: 1},
		{sepal_width: 5.2, petal_length: 6},
	]};
	jest.mock("axios");
	beforeEach(()=>{
		jest.clearAllMocks();
	});
	test("fail load data", async () => {
		api.get = jest.fn().mockImplementation(()=>Promise.resolve(mockedTables));
		fireEvent.click(screen.getByRole("button",{name: "Carica dati dal DB" }));
		expect(api.get).toHaveBeenCalledTimes(1);
		api.post = jest.fn().mockImplementationOnce(()=>Promise.resolve(mockedColumns)).mockImplementationOnce(()=>Promise.resolve(mockedData));
		await waitFor(() => {	
			expect(screen.getByText("iris")).toBeInTheDocument();
		});
		expect(screen.getByTestId("formDB")).toHaveFormValues({ toReduxDimensionsList: "" });
		await selectEvent.select(screen.getByLabelText("Seleziona dimensioni"), ["sepal_width", "petal_length"]);
		expect(screen.getByTestId("formDB")).toHaveFormValues({ toReduxDimensionsList: ["sepal_width", "petal_length"] });
		fireEvent.click(screen.getByRole("button", {name: "Conferma selezione"}));
		await waitFor(()=>{
			expect(screen.getByText("Avviso")).toBeInTheDocument();
		});
	});
	test("load data with no condition", async ()=>{
		api.get = jest.fn().mockImplementation(()=>Promise.resolve(mockedTables));
		fireEvent.click(screen.getByRole("button",{name: "Carica dati dal DB" }));
		expect(api.get).toHaveBeenCalledTimes(1);
		api.post = jest.fn().mockImplementationOnce(()=>Promise.resolve(mockedColumns)).mockImplementationOnce(()=>Promise.resolve(mockedData));
		await waitFor(() => {	
			expect(screen.getByText("iris")).toBeInTheDocument();
		});
		expect(screen.getByTestId("formDB")).toHaveFormValues({ toReduxDimensionsList: "" });
		await selectEvent.select(screen.getByLabelText("Seleziona dimensioni"), ["sepal_width", "petal_length"]);
		expect(screen.getByTestId("formDB")).toHaveFormValues({ toReduxDimensionsList: ["sepal_width", "petal_length"] });
		fireEvent.click(screen.getByText("Invia query"));
		await waitFor(()=>{
			expect(screen.getByRole("alert").textContent).toBe("4 elementi trovati");
		});
		fireEvent.click(screen.getByRole("button", {name: "Conferma selezione"}));
		await waitFor(()=>{
			expect(screen.getByText("Dati inseriti correttamente")).toBeInTheDocument();
		});
		expect(datasetStore.dimensions.length).toBe(2);
	});
	test("load data with condition", async ()=>{
		api.get = jest.fn().mockImplementation(()=>Promise.resolve(mockedTables));
		fireEvent.click(screen.getByRole("button",{name: "Carica dati dal DB" }));
		expect(api.get).toHaveBeenCalledTimes(1);
		api.post = jest.fn().mockImplementationOnce(()=>Promise.resolve(mockedColumns)).mockImplementationOnce(()=>Promise.resolve(mockedData));
		await waitFor(() => {	
			expect(screen.getByText("iris")).toBeInTheDocument();
		});
		expect(screen.getByTestId("formDB")).toHaveFormValues({ toReduxDimensionsList: "" });
		await selectEvent.select(screen.getByLabelText("Seleziona dimensioni"), ["sepal_width", "petal_length"]);
		expect(screen.getByTestId("formDB")).toHaveFormValues({ toReduxDimensionsList: ["sepal_width", "petal_length"] });
		fireEvent.change(screen.getByRole("combobox",{name:"Dimensione"}),{target:{value:"sepal_width"}});
		fireEvent.change(screen.getByRole("combobox",{name:"Condizione"}),{target:{value:">="}});
		fireEvent.change(screen.getByRole("textbox",{name:"Valore"}),{target:{value:"2"}});
		fireEvent.click(screen.getByText("Invia query"));
		await waitFor(()=>{
			expect(screen.getByRole("alert").textContent).toBe("4 elementi trovati");
		});
		fireEvent.click(screen.getByRole("button", {name: "Conferma selezione"}));
		await waitFor(()=>{
			expect(screen.getByText("Dati inseriti correttamente")).toBeInTheDocument();
		});
		expect(datasetStore.dimensions.length).toBe(2);
	});
});
