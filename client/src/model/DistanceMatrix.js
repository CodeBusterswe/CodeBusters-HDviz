class DistanceMatrix {
    /*array di objects
    {
        source : "s1"
        target : "t1"
        distance : 15.3
    }
    */
    data = [];

    getData() {
    	return this.data;
    }

    setData(data) {
    	this.data = data;
    }

    pushRow(row) {
    	this.data.push(row);
    }

}

export default DistanceMatrix;