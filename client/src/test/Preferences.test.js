import ViewModel from "./../ViewModel";

let viewModel;

beforeEach(() => {
	viewModel = new ViewModel();
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