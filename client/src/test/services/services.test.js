import {getTables,serverTest,getDatasetWithCustomParams,getColumnsByName,getDatasetWithParams} from "../../components/UI/burgerMenuUI/ModalContent/services"
import axios from 'axios';

jest.mock('axios');

describe('get tables', () => {
	afterEach(() => {
	jest.resetAllMocks();
	});
	it('should return all tables', async () => {
	const mockedTables = [{ table_name: "iris" },{ table_name: "pinguino" }];
	axios.get = jest.fn().mockResolvedValue(mockedTables);
	const actualValue = await getTables();
	expect(actualValue).toEqual(mockedTables);
	expect(axios.get).toBeCalledWith("/get-tables");
	});

	it('should return table name', async () => {
	const mockedColumn = [{ column_name: "sepal_length" }];
	axios.post = jest.fn().mockResolvedValue(mockedColumn);
	const actualValue = await getColumnsByName("iris");
	expect(actualValue).toEqual(mockedColumn);
	expect(axios.post).toBeCalledWith("/get-columns",{"table":"iris"});
	});

	it('should return selected columns by table name', async () => {
	const mockedColumns = [ {value:"sepal_length"} , {value:"sepal_width"} ];
	axios.post = jest.fn().mockResolvedValue(mockedColumns);
	const actualValue = await getDatasetWithParams(mockedColumns,"iris");// passo le colonne che ho selezionato e il nome della tabella 
	expect(actualValue).toEqual(mockedColumns); // confronto delle colonne 
	expect(axios.post).toBeCalledWith("/get-data",{"selectField":["sepal_length","sepal_width"] ,"table": "iris"}); //la chimata inizia col le colonne selezionate e il nome della tabella
	});

	it('should return a customized query with selected columns and table name', async () => {
	const mockedColumns = [ {value:"sepal_length"} , {value:"sepal_width"} ];
	const params ={conditionSign:">=", conditionColumn:"sepal_length", conditionValue:"5", table:"iris"}
	//console.log("OBJ:", Object.keys(params))
	axios.post = jest.fn().mockResolvedValue(mockedColumns);
	const actualValue = await getDatasetWithCustomParams(mockedColumns,">=","sepal_length","5","iris");// passo le colonne che ho selezionato e il nome della tabella 
	expect(actualValue).toEqual(mockedColumns); // confronto delle colonne 
	expect(axios.post).toBeCalledWith("/get-custom-data",{"selectField":["sepal_length","sepal_width"],params}); //la chimata inizia col le colonne selezionate e il nome della tabella 
	});

	it("test server connection ", async () => {
		serverTest();
	});

});

