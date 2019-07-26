var path = require("path");
module.exports = {
    entry: {
        home: "./home.js",
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','stage-0']
                    }
                }
            }
        ]
    }
};