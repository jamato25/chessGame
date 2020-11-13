module.exports = {
	entry: ['babel-polyfill',"./client/index.js"],
	output: {
		path: __dirname,
		filename: "./server/public/bundle.js",
	},
	mode: 'development',
	resolve: {
		extensions: [".js", ".jsx"],
	},
	devtool: "source-map",
	watchOptions: {
		ignored: /node_modules/,
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
          presets: ["@babel/preset-react"]
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			  },
		],
	},
}
