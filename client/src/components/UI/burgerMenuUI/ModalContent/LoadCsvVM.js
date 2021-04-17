import { makeObservable, observable, action } from "mobx";

export class LoadCsvVM {
	constructor(rootStore, closeModal){
		this.datasetStore = rootStore.datasetStore;
    	this.distanceMatricesStore = rootStore.distanceMatricesStore;
    	this.preferencesStore = rootStore.preferencesStore;
    	this.localData = [];
    	this.showSuccess = false;
    	this.showDanger = false;
		this.localDimensions = [...this.datasetStore.dimensions];
    	this.closeModal = closeModal.bind(null);
    	makeObservable(this, {
			localData: observable.shallow,
			showSuccess: observable,
			showDanger: observable,
			localDimensions: observable,
			resetAndClose: action,
			setLocalStates: action,
			selectAllDimensions: action,
			selectDimension: action,
			openAlertSuccess: action,
			openAlertDanger: action,
			setShowDanger: action,
			setShowSuccess: action,
			handleConfirm: action,
			handleDismiss: action,
		});
	}
	loadDataAndDims=()=>{
    	if(this.localData.length>0){
    		this.datasetStore.reset();
    		this.distanceMatricesStore.reset();
    		this.preferencesStore.reset();
    		this.datasetStore.loadData([...this.localData]);
    		this.datasetStore.loadDimensions([...this.localDimensions]);
    		this.datasetStore.updateSelectedData();
    	}else{
    		this.preferencesStore.reset();
    		this.datasetStore.loadDimensions([...this.localDimensions]);
    		this.datasetStore.updateSelectedData();
    	}
	}
	resetAndClose=()=>{
    	this.localData.clear();
    	this.closeModal();
	}
	setLocalStates = (newData, newDims) =>{
    	this.localData.replace(newData);
    	this.localDimensions.replace(newDims);
	}
	selectAllDimensions=event=>{
    	this.localDimensions.forEach(dimension => {
    		dimension.isChecked = event.target.checked;
    	});
	}
	selectDimension=event=>{
    	this.localDimensions.forEach(dimension =>{
    		if(dimension.value === event.target.id)
    			dimension.isChecked = event.target.checked;
    	});
	}
	handleConfirm=()=>{
		this.loadDataAndDims();
		this.resetAndClose();
		this.openAlertSuccess();
	}
	handleDismiss=()=>{
		this.resetAndClose();
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