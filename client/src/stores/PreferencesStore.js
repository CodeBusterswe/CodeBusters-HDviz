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
