import { action, computed, makeObservable, observable } from "mobx";
import { VisualizationType } from "../../../utils";
import {AiOutlineDotChart , AiOutlineFunction} from "react-icons/ai";
import {ImDatabase} from "react-icons/im";
import {FaFileCsv} from "react-icons/fa";
import { RiMistFill } from "react-icons/ri";
import { IoGrid, IoShareSocialOutline, IoMoveSharp} from "react-icons/io5";
import {SiGraphcool} from "react-icons/si";
import {IoIosSave} from "react-icons/io";

export class MenuVM {

    modalIsOpen = false;
    id = -1;
	names = ["Salva/Carica sessione", "Carica dati dal DB", 
    	"Carica dati da CSV", "Riduci dimensioni", "Calcola distanza", "Scatterplot Matrix",
    	"Adjacency Matrix","Heat Map","Force Field","Linear Projection"]; 
	icons = [<IoIosSave size={40} className="icon"/>, 
		<ImDatabase size={32} className="icon"/>,
		<FaFileCsv size={32} className="icon"/>, 
		<SiGraphcool size={32} className="icon"/>,
		<AiOutlineFunction size={32} className="icon"/>,
		<AiOutlineDotChart size={32} className="icon"/>,
		<IoGrid size={32} className="icon"/>,
		<RiMistFill size={32} className="icon"/>,
		<IoShareSocialOutline size={32} className="icon"/>,
		<IoMoveSharp size={32} className="icon"/>];

	constructor(rootStore){
    	this.preferencesStore = rootStore.preferencesStore;
    	this.datasetStore = rootStore.datasetStore;
    	this.distanceMatricesStore = rootStore.distanceMatricesStore;
		this.checkToDisabled = this.checkToDisabled.bind(this);

    	makeObservable(this,{
    		modalIsOpen : observable,
    		id: observable,
    		openModal: action,
			closeModal: action,
			showChart: action,
			distanceMatricesNumber: computed,
			isDataLoaded: computed
    	});
	}
	
	openModal = index => {
    	this.modalIsOpen = true;
    	this.id = index;
	}

	closeModal = () => {
    	this.modalIsOpen = false;
		//setTimeout(()=>{this.id=-1;}, 4000);
	}

	showChart = index => {
    	switch(index) {
    	case 5:
    		this.preferencesStore.chart = VisualizationType.ScatterPlotMatrix;
    		break;
    	case 6:
    		this.preferencesStore.chart = VisualizationType.AdjacencyMatrix;
    		break;
    	case 7:
    		this.preferencesStore.chart = VisualizationType.HeatMap;
    		break;
    	case 8:
    		this.preferencesStore.chart = VisualizationType.ForceField;
    		break;
    	case 9:
    		this.preferencesStore.chart = VisualizationType.PLMA;
    		break;
    	default:
    	}
	}
	get isDataLoaded(){
		return this.datasetStore.checkedDimensions.length < 2;
	}
	get distanceMatricesNumber(){
		return this.distanceMatricesStore.distanceMatricesNames.length < 1;
	}

	checkToDisabled = index => {
    	// eslint-disable-next-line no-extra-parens
    	return (index >= 3 && this.isDataLoaded) || ((index ===6 || index===8) && this.distanceMatricesNumber) ;
	}
}