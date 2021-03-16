class DistanceMatrix {
    /*array di objects
    {
        source : "s1"
        target : "t1"
        distance : 15.3
    }
    {
        id : "id1"
        group : "g1"
    }
    */
    nodes = [];
    links = [];

    getNodes() {
    	return this.nodes;
    }

    getLinks() {
    	return this.links;
    }

    pushNode(node) {
    	this.nodes.push(node);
    }

    pushLink(link) {
    	this.links.push(link);
    }
}

export default DistanceMatrix;