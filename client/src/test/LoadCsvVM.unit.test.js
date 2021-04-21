import RootStore from "../stores/RootStore";
import { LoadCsvVM } from "../components/UI/burgerMenuUI/ModalContent/LoadCsvVM";
import Dimension from "./../stores/data/Dimension";

const rootStore = new RootStore();
const loadCsv = new LoadCsvVM(rootStore, function(){});
describe("save data and dims in store", () => {
	const dim1 = new Dimension("sepal"), dim2 = new Dimension("petal");
	const dataset = [{sepal: 5.1, petal: 3.5},{sepal: 4.9, petal: 3.0}];
	test("load data and dims", () => {
		loadCsv.setLocalStates(dataset, [dim1, dim2]);
		loadCsv.loadDataAndDims();
		//test new data
		expect(rootStore.datasetStore.originalData).toStrictEqual(dataset);
		expect(rootStore.datasetStore.dimensions).toStrictEqual([dim1, dim2]);
		expect(rootStore.datasetStore.selectedData).toStrictEqual(dataset);
	});
	test("update dims", () => {
		dim1.isChecked = false;
		loadCsv.setLocalStates([], [dim1, dim2]);
		loadCsv.loadDataAndDims();
		//test new data
		expect(rootStore.datasetStore.originalData).toStrictEqual(dataset);
		expect(rootStore.datasetStore.dimensions).toStrictEqual([dim1, dim2]);
		expect(rootStore.datasetStore.selectedData).toStrictEqual([{petal: 3.5},{petal: 3.0}]);
	});
});