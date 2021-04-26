import PreferencesStore from "./PreferencesStore";
import DatasetStore from "./DatasetStore";
import DistanceMatricesStore from "./DistanceMatricesStore";

class RootStore{
	constructor(){
		this.preferencesStore = new PreferencesStore(this);
		this.datasetStore = new DatasetStore(this);
		this.distanceMatricesStore = new DistanceMatricesStore(this);
	}
}export default RootStore;