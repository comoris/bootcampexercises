var webpack = require("webpack");
var path = require('path');

var env = process.env.NODE_ENV || 'dev' ;

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
        { test: /\.html$/, loader: 'raw-loader' }
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
            pkg: require('./package.json'),
            template: 'index-template.html',
            inject: false
        })
    ]
}
