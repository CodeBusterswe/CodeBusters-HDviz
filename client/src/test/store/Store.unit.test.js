import Dimension from "../../stores/data/Dimension";
import DatasetStore from "../../stores/DatasetStore";
import DistanceMatrix from "../../stores/data/DistanceMatrix";
import DistanceMatricesStore from "../../stores/DistanceMatricesStore";
import RootStore from "../../stores/RootStore";
import {FfPreferencesVM } from "../../components/UI/graphUI/preferences/FfPreferencesVM";

let store,
	dimension,
	dataset,
	dmStore,
	distanceMatrix,
	dimension1,
	dimension2;

describe("Datasetstore", ()=>{
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

	test("store should add new dimensions from dimensionality reduction process", () => {
		store.addDimensionsToDataset(dimension);
		expect(store.selectedDimensions).toStrictEqual([dimension]);
	});

	test("store should reset data", () => {
		store.addDimensionsToDataset(dimension);
		store.loadData(dataset);
		store.reset();
		expect(store.originalData).toStrictEqual([]);
		expect(store.dimensions).toStrictEqual([]);
		expect(store.selectedData).toStrictEqual([]);
	});
});

describe("DistanceMatricesStore", ()=>{
	beforeEach(() => {
		store = new DatasetStore();
		dimension = new Dimension("test");
		dataset = [{test: "test"}];
	});

	test("store should add new distance matrices and return them", () => {
		dmStore = new DistanceMatricesStore();
		distanceMatrix = new DistanceMatrix();
		dmStore.addDistanceMatrix(distanceMatrix);
		expect(dmStore.distanceMatrices).toStrictEqual([distanceMatrix]);
	});
});

describe("tests with different types of dimensions", ()=>{
	beforeEach(() => {
		dimension1 = new Dimension("testNum");
		dimension2 = new Dimension("testCat",true,false);
		dataset = [{testNum: "1", testCat: "test"}];
		store.loadData(dataset);
		store.loadDimensions([dimension1,dimension2]);
	});
	test("Checks that numeric dimensions are correctly selected", () => {
		expect(store.numericDimensions).toStrictEqual([dimension1]);
	});

	test("Checks that categorical dimensions are correctly selected", () => {
		expect(store.categoricCheckedDimensions).toStrictEqual([dimension2]);
	});
});