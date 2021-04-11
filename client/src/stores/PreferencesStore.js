import {makeAutoObservable} from "mobx";
import PreferencesAM from "./data/preferences/PreferencesAM";
import PreferencesHM from "./data/preferences/PreferencesHM";
import PreferencesSPM from "./data/preferences/PreferencesSPM";
import PreferencesFF from "./data/preferences/PreferencesFF";
import PreferencesPLMA from "./data/preferences/PreferencesPLMA";

class PreferencesStore {
	constructor(rootStore){
		this.rootStore = rootStore;
		this.chart = undefined;
		this.PreferencesAm = new PreferencesAM();
		this.PreferencesAm = new PreferencesHM();
		this.PreferencesAm = new PreferencesSPM();
		this.PreferencesAm = new PreferencesPLMA();
		this.PreferencesAm = new PreferencesFF();
		makeAutoObservable(this, {rootStore: false});
	}

	setChartToShow(chartName){
		this.chart = chartName;
	}
}

export default PreferencesStore;
