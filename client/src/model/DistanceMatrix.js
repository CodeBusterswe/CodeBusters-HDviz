class DistanceMatrix {
    
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