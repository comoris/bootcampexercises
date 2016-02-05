var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var env = process.env.NODE_ENV || 'dev' ;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './app/scripts/app.js',
    output: {
        path: (env == 'prod') ? './dist/bundle' : './app/bundle',
        filename: "bundle-[hash].js",
        publicPath: 'bundle/',
    },
    module: {
      loaders: [
        { test: /\.scss$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader') },
        { test: /\.html$/, loader: 'raw-loader' },
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
            template: 'app/index-template.html',
        }),
        new ExtractTextPlugin("styles-[hash].css")
    ]
}
