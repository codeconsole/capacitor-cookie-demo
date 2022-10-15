const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// assets.js
const Assets = require('./assets');

module.exports = {
    entry: {
        app: "./assets.js",
    },
    output: {
        path: __dirname + "build/wwwroot-ignore/",
        filename: "[name].bundle.js"
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns:
            Assets.map(asset => {
                const folder = asset.substring(0, asset.lastIndexOf('/'))
                return {
                        from: path.resolve(__dirname, `./node_modules/${asset}`),
                        to: path.resolve(__dirname, './www/npm/' + folder)}
                })
        })
    ]
};
