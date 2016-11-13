var path = require("path");
module.exports = {
    entry: {
        home: "./bytePlanet.js",
        diaries: "./diaries.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    }
};