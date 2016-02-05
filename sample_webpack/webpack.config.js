var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var Bowerplugin = require("bower-webpack-plugin");
var webpack = require("webpack");

module.exports = {
    entry: {
        a: './app.js',
        b: './app2.js',
        },
    output: {
        path: './bundle',
        filename: "[name]._[hash].js",
        publicpath: './bundle',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            chunks: ["a", "b"],
            filename: "common_[hash].js"
        })
    ],
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'babel' },
        { test: /\.css$/, exclude: /node_modules/, loader: 'style!css' },
        { test: /\.scss$/, loader: 'style!css!sass' },
        { test: /\.png$/, loader: 'url?limit=4000' }
      ]
    },
    // plugins: [
    //     new ExtractTextPlugin("styles.css")
    // ],

    // IF BOWER
    // plugins: [
    //     new Bowerplugin()
    // ],
    // resolve: {
    //     moduleDirectories: [
    //         'node_modules',
    //         'bower_components'
    //     ]
    // },
    devtool: 'source-map',
    plugins: [
        // create template file
        new HtmlWebpackPlugin({
            filename: '../index.html',
            pkg: require('./package.json'),
            template: 'index-template.html',
            inject: false
        })
    ],

}


// css-loader zet css om in js
// hotreloading werkt nt samen met extract-text-webpack-plugin

