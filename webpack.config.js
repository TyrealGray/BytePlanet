var path = require("path");
module.exports = {
    entry: {
        home: "./bytePlanet.js",
        diaries: "./diaries.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    }
};