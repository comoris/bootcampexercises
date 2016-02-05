var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var env = process.env.NODE_ENV || 'dev' ;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './app/scripts/app.js',
    output: {
        path: (env == 'prod') ? './dist/bundle' : './app/bundle',
        filename: "bundle.js",
        publicpath: 'bundle/',
    },
    module: {
      loaders: [
        { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
        { test: /\.html$/, loader: 'raw-loader' },
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
      ]
    },
    resolve: {
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js'
        }
    },
    devServer: {
        contentBase: './app',
    },
    plugins: [
        // create template file
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'app/index.html',
        }),
        new ExtractTextPlugin("styles.css")
    ]
}
