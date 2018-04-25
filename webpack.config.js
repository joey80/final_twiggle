var path = require('path');

module.exports = {
	entry: "./public/js/app.js",
	extra: {
		output: {
		path: path.resolve(__dirname, "./public/js"),
		filename: "final.js",
		chunkFilename: "final.js"
		}
	}
}