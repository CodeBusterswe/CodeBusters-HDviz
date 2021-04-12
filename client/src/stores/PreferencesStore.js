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
		this.PreferencesHm = new PreferencesHM();
		this.PreferencesSpm = new PreferencesSPM();
		this.PreferencesPlma = new PreferencesPLMA();
		this.PreferencesFf = new PreferencesFF();
		makeAutoObservable(this, {rootStore: false});
	}

	reset(){
		this.chart = undefined;
		this.PreferencesAm = new PreferencesAM();
		this.PreferencesHm = new PreferencesHM();
		this.PreferencesSpm = new PreferencesSPM();
		this.PreferencesPlma = new PreferencesPLMA();
		this.PreferencesFf = new PreferencesFF();
	}
}

export default PreferencesStore;
