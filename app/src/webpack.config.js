let path = require('path');
let config = {
    node: {
        fs: "empty"
        },
	entry: './src/App.js',
	output: {
		path: path.resolve(__dirname,'./www/'),
		filename: 'script.js'
	},
	devtool: "eval-sourcemap"
};
module.exports = (evn, options) => {
	let mode = options.mode === 'production';
	config.devtool = mode ? false : "eval-sourcemap";
	return config
};