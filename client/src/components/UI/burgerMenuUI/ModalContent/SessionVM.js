import { makeAutoObservable} from "mobx";
export class SessionVM{
	constructor(rootStore, closeModal){
		this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;
		this.distanceMatricesStore = rootStore.distanceMatricesStore;
		this.showDanger = false;
		this.showSuccess = false;
		this.closeModal = closeModal.bind(null);
		makeAutoObservable(this, {datasetStore: false, distanceMatricesStore: false}, {autoBind: true}); 
		console.log("lol");
	}

    handleConfirm=()=>{
    	//this.resetAndClose();
    	let temp = JSON.stringify(this.datasetStore);
    	console.log(temp);
	
    	this.datasetStore.fromJSON(temp);
    	this.closeModal();
    	this.openAlertSuccess();
    }
	handleDismiss=()=>{
		//this.resetAndClose();
		this.closeModal();
		this.openAlertDanger();
	}
	openAlertSuccess = () =>{
    	return this.datasetStore.checkedDimensions.length!==0 ?
    		this.showSuccess = true :
    		this.showDanger = true;
	}
	openAlertDanger = () =>{
    	this.setShowDanger(true);
	}
    setShowDanger = bool =>{
    	this.showDanger = bool;
    }
    setShowSuccess= bool =>{
    	this.showSuccess = bool;
    }
}