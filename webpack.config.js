var path = require("path");
module.exports = {
    entry: {
        home: "./home.js",
        diaries: "./diaries.js"
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};