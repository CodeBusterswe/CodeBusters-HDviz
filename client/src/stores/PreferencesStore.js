import {makeAutoObservable} from "mobx";
import PreferencesAM from "./data/preferences/PreferencesAM";
class PreferencesStore {
	constructor(rootStore){
		this.rootStore = rootStore;
		this.chart = undefined;
		//VisualizationType.ScatterPlotMatrix
		this.PreferencesAm = new PreferencesAM();
		makeAutoObservable(this, {rootStore: false});
	}

	setChartToShow(chartName){
		this.chart = chartName;
	}
}export default PreferencesStore;
