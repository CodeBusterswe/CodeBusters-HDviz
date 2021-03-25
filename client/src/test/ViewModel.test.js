import ViewModel from "./../ViewModel";
import Dimension from "./../model/Dimension";
import DistanceMatrix from "../model/DistanceMatrix";

let viewModel,
	dimensions,
	data;

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

		expect(viewModel.getDimensions()).toStrictEqual([dimension1]);
		expect(viewModel.getSelectedData()).toStrictEqual([{test1: "x"}, {test1: "x"}]);
	});

	test("viewModel should filter dimensions", () => {
		dimension1.isChecked = false;
		viewModel.loadDataAndDims(data, [dimension1,dimension2]);
		expect(viewModel.getCheckedDimensions()).toStrictEqual([dimension2.value]);

		dimension2.isNumeric = false;
		viewModel.updateDims([dimension1,dimension2]);
		expect(viewModel.getCategoricCheckedDimensions()).toStrictEqual([dimension2.value]);
	});
});

describe("parsing csv data", () => {

	let dim1 = new Dimension("name"),
		dim2 = new Dimension("age"),
		readCsv = [{data: ["name", "age"]},{data: ["Rick", "24"]}],
		parsedData = [],
		parsedDims = [dim1, dim2];

	test("viewModel should parse csv files", () => {

		parsedData = [{name:"Rick", age:24}];
		dim1.isNumeric = false;
		expect(viewModel.parseAndLoadCsvData(readCsv)).toStrictEqual([parsedData,parsedDims]);
	});

	test("if a cat. dim. has an empty value it should be undefined", () => {
	
		readCsv = [{data: ["name", "age"]},{data: ["", "24"]}];
		parsedData = [{name: undefined, age:24}];
		dim1.isNumeric = false;
		expect(viewModel.parseAndLoadCsvData(readCsv)).toStrictEqual([parsedData,parsedDims]);
	});

	test("NaN conversion in numeric dimensions", () => {
	
		readCsv = [{data: ["name", "age"]},{data: ["Rick", "24"]},{data: ["Rick", "NaN"]}];
		parsedData = [{name: "Rick", age: 24},{name: "Rick", age: NaN}];
		dim1.isNumeric = false;
		expect(viewModel.parseAndLoadCsvData(readCsv)).toStrictEqual([parsedData,parsedDims]);
	});
});

describe("viewModel should reduce dimensions", () => {

	let data = [[300,16],[300,20]],
		dims = [new Dimension("salary"), new Dimension("age")];

	beforeEach(() => {
		viewModel.loadDataAndDims(data,dims);
	});
	
	describe("dimensionality reduction by algorithm", () => {

		test("FastMap algorithm", () => {
			viewModel.reduceDimensions("fastMap", {Name:"fastMap", DimensionNumber: 2}, data);
			let dimR1 = new Dimension("fastMap1"),
				dimR2 = new Dimension("fastMap2");
			dimR1.isReduced = true;
			dimR2.isReduced = true;
			expect(viewModel.getDimensions()).toStrictEqual([dims[0],dims[1],dimR1,dimR2]);
		});

		test("IsoMap algorithm", () => {
			viewModel.reduceDimensions("isoMap", {Name:"isoMap", DimensionNumber: 2, Neighbors: 30}, data);
			let dimR1 = new Dimension("isoMap1"),
				dimR2 = new Dimension("isoMap2");
			dimR1.isReduced = true;
			dimR2.isReduced = true;
			expect(viewModel.getDimensions()).toStrictEqual([dims[0],dims[1],dimR1,dimR2]);
		});

		test("LLE algorithm", () => {
			viewModel.reduceDimensions("lle", {Name:"lle", DimensionNumber: 2, Neighbors: 30}, data);
			let dimR1 = new Dimension("lle1"),
				dimR2 = new Dimension("lle2");
			dimR1.isReduced = true;
			dimR2.isReduced = true;
			expect(viewModel.getDimensions()).toStrictEqual([dims[0],dims[1],dimR1,dimR2]);
		});

		test("t-sne algorithm", () => {
			viewModel.reduceDimensions("t-sne", {Name:"tSne", DimensionNumber: 2, Perplexity: 130, Epsilon: 15}, data);
			let dimR1 = new Dimension("tSne1"),
				dimR2 = new Dimension("tSne2");
			dimR1.isReduced = true;
			dimR2.isReduced = true;
			expect(viewModel.getDimensions()).toStrictEqual([dims[0],dims[1],dimR1,dimR2]);
		});
	});

	describe("dimensionality reduction by distance", () => {

		let data = [{salary:700, age:24}, {salary:600, age:23}];

		test("Euclidean", () => {
			/*
			viewModel.loadDataAndDims(data,dims);
			viewModel.beginReduceDimensionsByDist("euclidean",data, "test");
			let dm = viewModel.getDistanceMatrices();
			dm = dm[0];
			expect(dm).toBeTruthy();
			expect(dm.nodes).toStrictEqual([{id: "node0",salary:700, age:24},{id: "node1",salary:600, age:23}]);
			expect(dm.links).toStrictEqual([{source: "node0", target: "node1", value: 100.00499987500625}]);
			*/
		});

		test("Manhattan", () => {

		});

		test("Canberra", () => {

		});

		test("Chebyshev", () => {

		});
	});
});
describe("tests for preferences", () => {

	test("PLMA", () => {
		viewModel.setChartToShow("PLMA");
		viewModel.setPlmaPreferences("dimensions",["test1","test2","test3","test4"]);
		viewModel.setPlmaPreferences("color","red");
		expect(viewModel.getChartToShow()).toStrictEqual("PLMA");
		expect(viewModel.getPlmaPreferences()).toStrictEqual([["test1","test2","test3","test4"],"red"]);		
	});

	test("SPM", () => {
		viewModel.setChartToShow("ScatterPlotMatrix");
		viewModel.setSpmAxis("axis1","test1");
		viewModel.setSpmAxis("axis2","test2");
		viewModel.setSpmAxis("axis3","test3");
		viewModel.setSpmAxis("axis4","test4");
		viewModel.setSpmAxis("axis5","test5");
		viewModel.setSpmAxis("color","red");
		expect(viewModel.getChartToShow()).toStrictEqual("ScatterPlotMatrix");
		expect(viewModel.getSpmPreferences()).toStrictEqual([["test1","test2","test3","test4","test5"],"red"]);		
	});

	test("HM", () => {
		viewModel.setChartToShow("HeatMap");
		viewModel.setHmPreferences("xAxis","test1");
		viewModel.setHmPreferences("yAxis","test2");
		viewModel.setHmPreferences("heat","test3");
		expect(viewModel.getChartToShow()).toStrictEqual("HeatMap");
		expect(viewModel.getHmPreferences()).toStrictEqual(["test1","test2","test3"]);		
	});

	test("Adjacency Matrix", () => {
		viewModel.setChartToShow("AdjacencyMatrix");
		viewModel.setAmPreferences("distanceMatrix",[1,3,5,7]);
		viewModel.setAmPreferences("orderBy","test1");
		viewModel.setAmPreferences("label","test2");
		expect(viewModel.getChartToShow()).toStrictEqual("AdjacencyMatrix");
		expect(viewModel.getAmPreferences()).toStrictEqual([[1,3,5,7],"test1","test2"]);		
	});

	test("ForceField", () => {
		viewModel.setChartToShow("ForceField");
		viewModel.setFfPreferences("distanceMatrix",[1,3,5,7]);
		viewModel.setFfPreferences("color","test1");
		viewModel.setFfPreferences("distMax","test2");
		viewModel.setFfPreferences("distMin","test3");
		expect(viewModel.getChartToShow()).toStrictEqual("ForceField");
		expect(viewModel.getFfPreferences()).toStrictEqual([[1,3,5,7],"test1","test2","test3"]);		
	});
});