import Model from "../../model/Model";
import Dimension from "../../model/Dimension";
import DistanceMatrix from "../../model/DistanceMatrix";
import DistanceMatricesModel from "../../model/DistanceMatricesModel";

let model,
	dmModel,
	dimension,
	distanceMatrix,
	dataset;

beforeEach(() => {
	model = new Model();
	dimension = new Dimension("test");
	dataset = [{test: "test"}];
});

test("model should set and return the original data/dimensions", () => {
	model.loadData(dataset);
	model.loadDimensions([dimension]);
	model.updateSelectedData(dataset);
	
	expect(model.originalData).toStrictEqual(dataset);
	expect(model.selectedData).toStrictEqual(dataset);
	expect(model.selectedDimensions).toStrictEqual([dimension]);
});

test("model should add new distance matrices and return them", () => {
	dmModel = new DistanceMatricesModel();
	distanceMatrix = new DistanceMatrix();
	dmModel.addDistanceMatrix(distanceMatrix);
	expect(dmModel.distanceMatrices).toStrictEqual([distanceMatrix]);
});

test("model should add new dimensions from dimensionality reduction process", () => {
	model.addDimensionsToDataset(dimension);
	expect(model.selectedDimensions).toStrictEqual([dimension]);
});
