module.exports = {  //eslint-disable-line
	babel: {
		plugins: [
			["@babel/plugin-proposal-class-properties", { "loose": true }],
			["@babel/plugin-proposal-nullish-coalescing-operator"],
			["@babel/plugin-proposal-private-methods", { "loose": true }]
		]
	}
};