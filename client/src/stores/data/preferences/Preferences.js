class Preferences {
    
	constructor() {
    	if (this.constructor === Preferences) {
    		throw new TypeError("Abstract classes can't be instantiated.");
    	}
	}

	serialize() {
    	throw new TypeError("Method 'serialize()' must be implemented.");
	}

	deserialize() {
    	throw new TypeError("Method 'deserialize()' must be implemented.");
	}

}

export default Preferences;