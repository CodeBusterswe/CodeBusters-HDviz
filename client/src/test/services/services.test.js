import {getTables,serverTest,getDatasetWithCustomParams,getColumnsByName,getDatasetWithParams} from "../../components/UI/burgerMenuUI/ModalContent/services";
//import axios from 'axios';
import {api} from "../../components/UI/burgerMenuUI/ModalContent/services/ApiURL";

//jest.mock('axios');
describe("Api test", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});
	it("should return all tables", async () => {
		const mockedTables = {data:[{ table_name: "iris" },{ table_name: "pinguino" }]};
		api.get = jest.fn().mockResolvedValue(mockedTables);
		try{
			const actualValue = await getTables();
			console.log("getTabs:",actualValue);
			expect({data:actualValue}).toEqual(mockedTables);
			expect(api.get).toBeCalledWith("/get-tables");
		}catch(err){
			console.log("getTabs  Error");
			expect("Network Error").toEqual("Network Error");
		}
	});

	it("should return table name", async () => {
		const mockedColumn = {data:[{ column_name: "sepal_length" }]};
		api.post = jest.fn().mockResolvedValue(mockedColumn);
		const actualValue = await getColumnsByName("iris");
		expect({data:actualValue}).toEqual(mockedColumn);
		expect(api.post).toBeCalledWith("/get-columns",{"table":"iris"});
	});

	it("should return selected columns by table name", async () => {
		const mockedColumns =[ {value:"sepal_length"} , {value:"sepal_width"} ];
		api.post = jest.fn().mockResolvedValue(mockedColumns);
		const actualValue = await getDatasetWithParams(mockedColumns,"iris");// passo le colonne che ho selezionato e il nome della tabella 
		expect(actualValue).toEqual(mockedColumns); // confronto delle colonne 
		expect(api.post).toBeCalledWith("/get-data",{"selectField":["sepal_length","sepal_width"] ,"table": "iris"}); //la chimata inizia col le colonne selezionate e il nome della tabella
	});

	it("should return a customized query with selected columns and table name", async () => {
		const mockedColumns = [ {value:"sepal_length"} , {value:"sepal_width"} ];
		const params ={conditionSign:">=", conditionColumn:"sepal_length", conditionValue:"5", table:"iris"};
		api.post = jest.fn().mockResolvedValue(mockedColumns);
		const actualValue = await getDatasetWithCustomParams(mockedColumns,">=","sepal_length","5","iris");// passo le colonne che ho selezionato e il nome della tabella 
		expect(actualValue).toEqual(mockedColumns); // confronto delle colonne 
		expect(api.post).toBeCalledWith("/get-custom-data",{"selectField":["sepal_length","sepal_width"],params}); //la chimata inizia col le colonne selezionate e il nome della tabella 
	});
});
