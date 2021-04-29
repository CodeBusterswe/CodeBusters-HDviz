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
		this.preferencesAm = new PreferencesAM();
		this.preferencesHm = new PreferencesHM();
		this.preferencesSpm = new PreferencesSPM();
		this.preferencesPlma = new PreferencesPLMA();
		this.preferencesFf = new PreferencesFF();
		makeAutoObservable(this, {rootStore: false});
	}
	toJSON(){
		return {
			chart: this.chart ? this.chart : "undefined",
			preferencesAm: this.preferencesAm,
			preferencesFf: this.preferencesFf,
			preferencesHm: this.preferencesHm,
			preferencesPlma: this.preferencesPlma,
			preferencesSpm: this.preferencesSpm
		};
	}
	fromJSON(store){
		this.chart = store.chart!== "undefined" ? store.chart : undefined;
		this.preferencesAm.fromJSON(store.preferencesAm);
		this.preferencesFf.fromJSON(store.preferencesFf);
		this.preferencesHm.fromJSON(store.preferencesHm);
		this.preferencesPlma.fromJSON(store.preferencesPlma);
		this.preferencesSpm.fromJSON(store.preferencesSpm);
	}
	reset(){
		this.chart = undefined;
		this.preferencesAm = new PreferencesAM();
		this.preferencesHm = new PreferencesHM();
		this.preferencesSpm = new PreferencesSPM();
		this.preferencesPlma = new PreferencesPLMA();
		this.preferencesFf = new PreferencesFF();
	}
}

export default PreferencesStore;
