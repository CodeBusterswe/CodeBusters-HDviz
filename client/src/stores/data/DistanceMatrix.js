class DistanceMatrix {
    #nodes = [];
    #links = [];
    #name = "";

    get nodes() {
    	return this.#nodes;
    }

    get links() {
    	return this.#links;
    }

    get name(){
    	return this.#name;
    }

    set name(name){
    	this.#name = name;
    }
    pushNode(node) {
    	this.#nodes.push(node);
    }

    pushLink(link) {
    	this.#links.push(link);
    }
}

export default DistanceMatrix;