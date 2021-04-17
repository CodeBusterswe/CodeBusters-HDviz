import Dimension from "../../../../stores/data/Dimension";

export class MyCSVReaderVM {
	constructor(setLocalStates){
		this.setLocalStates = setLocalStates.bind(null);
	}
	handleOnDrop = data =>{
		let columns = data.shift().data, 
			parsedData = [],
			dimensions;
		
		data.forEach(val =>{ //for each row
			if(val.data !== ""){ 
				let line = {};
				for (let i = 0; i < val.data.length; i++) { //for each value of the row
					switch(val.data[i]){
					case "":	//stringa vuota per dimensioni categoriche
						line[columns[i]] = undefined;
						break;
					case "NaN":	//NaN per dimensioni numeriche
						line[columns[i]] = NaN;
						break;
					default:
						line[columns[i]] = +val.data[i] || val.data[i]==="0" ? +val.data[i] : val.data[i];
						break;
					}
				}
				parsedData.push(line); 		
			}
		});
        
		dimensions = columns.map(dimName => {
			let d = new Dimension(dimName);
			d.isNumeric = +parsedData[0][dimName] || parsedData[0][dimName]===0 ? true : false;
			return d;
		});
		this.setLocalStates.bind(null)(parsedData, dimensions);
	}

	handleOnError(error){
		console.log("errore:", error);
	}
}