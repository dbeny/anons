import path from "node:path";

export default {
	mode: "production",
	entry: {
		server: {import: "./Main"}
	},
	target: "node20",
	output: {
		path: path.resolve("../../dist"),
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)$/,
				exclude: /node_modules/,
				loader: "ts-loader"
			}
		]
	},
	resolve: {
		extensions: [".js", ".ts"]
	}
}