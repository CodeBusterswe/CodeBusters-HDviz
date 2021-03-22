import ViewModel from "./../ViewModel";
import Dimension from "./../model/Dimension";
import DistanceMatrix from "./../model/DistanceMatrix";

let viewModel,
	dimensions,
	data;

//template
//test("", () => {});

beforeEach(() => {
	viewModel = new ViewModel();
});

describe("tests for getters/setters", () => {
	let dimension1 = new Dimension("test1"),
		dimension2 = new Dimension("test2");
		
	dimensions = [dimension1,dimension2];
	data = [{test1: "x", test2: "x"},{test1: "x",test2: "x"}];

	test("viewModel should update model and get data", () => {
		viewModel.loadDataAndDims(data, dimensions);
		expect(viewModel.getOriginalData()).toStrictEqual(data);
		
		viewModel.updateDims([dimension1]);

		//expect(viewModel.updateSelectedData()).toHaveBeenCalled();
		expect(viewModel.getDimensions()).toStrictEqual([dimension1]);
		expect(viewModel.getSelectedData()).toStrictEqual([{test1: "x"}, {test1: "x"}]);
	});

	test("viewModel should filter dimensions", () => {
		dimension1.isChecked(false);
		viewModel.loadDataAndDims(data, [dimension1,dimension2]);
		expect(viewModel.getCheckedDimensions()).toStrictEqual([dimension2.getValue()]);

		dimension2.isNumeric(false);
		viewModel.updateDims([dimension1,dimension2]);
		expect(viewModel.getCategoricCheckedDimensions()).toStrictEqual([dimension2.getValue()]);
	});
});

test("viewModel should parse csv files", () => {
	/*
	let readCsv = [{data: ["name", "age"]},{data: ["Rick", "24"]}],
		parsedDims = [new Dimension("name").isNumeric(false), new Dimension("age")],
		parsedData = 

	expect.(viewModel.parseAndLoadCsvData(readCsv)).toBe();
	*/
});
