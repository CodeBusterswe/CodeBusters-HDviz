import Dimension from "../../stores/data/Dimension";
import DatasetStore from "../../stores/DatasetStore";
import DistanceMatrix from "../../stores/data/DistanceMatrix";
import DistanceMatricesStore from "../../stores/DistanceMatricesStore";

let store,
	dimension,
	dataset,
	dmStore,
	distanceMatrix;

beforeEach(() => {
	store = new DatasetStore();
	dimension = new Dimension("test");
	dataset = [{test: "test"}];
});

test("store should set and return the original data/dimensions", () => {
	store.loadData(dataset);
	store.loadDimensions([dimension]);
	store.updateSelectedData(dataset);
	
	expect(store.originalData).toStrictEqual(dataset);
	expect(store.selectedData).toStrictEqual(dataset);
	expect(store.selectedDimensions).toStrictEqual([dimension]);
});

test("store should add new distance matrices and return them", () => {
	dmStore = new DistanceMatricesStore();
	distanceMatrix = new DistanceMatrix();
	dmStore.addDistanceMatrix(distanceMatrix);
	expect(dmStore.distanceMatrices).toStrictEqual([distanceMatrix]);
});

test("store should add new dimensions from dimensionality reduction process", () => {
	store.addDimensionsToDataset(dimension);
	expect(store.selectedDimensions).toStrictEqual([dimension]);
});
