import Model from "./../model/Model";
import Dimension from "./../model/Dimension";
import DistanceMatrix from "./../model/DistanceMatrix";

let model,
	dimension,
	distanceMatrix,
	dataset;

//template
//test("", () => {});

beforeEach(() => {
	model = new Model();
	dimension = new Dimension("test");
	dataset = [{test: "test"}];
});

test("model should set and return the original data/dimensions", () => {
	model.loadData(dataset);
	model.loadDimensions([dimension]);
	model.updateSelectedData(dataset);
	expect(model.getOriginalData()).toStrictEqual(dataset);
	expect(model.getSelectedData()).toStrictEqual(dataset);
	expect(model.getSelectedDimensions()).toStrictEqual([dimension]);
});

test("model should add new distance matrices and return them", () => {
	distanceMatrix = model.distanceMatrices;
	model.addDistanceMatrix(distanceMatrix);
	expect(model.getDistanceMatrices()).toStrictEqual(distanceMatrix);
});

test("model should add new dimensions from dimensionality reduction process", () => {
	model.addDimensionsToDataset(dimension)
	expect(model.getSelectedDimensions()).toStrictEqual([dimension]);
});
