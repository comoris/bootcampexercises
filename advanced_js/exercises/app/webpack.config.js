var webpack           = require("webpack");

module.exports = {
    entry: './scripts/app.js',
    output: {
        path: './bundle',
        filename: "app.js",
        publicpath: 'bundle/'
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'babel' },
        { test: /\.css$/, exclude: /node_modules/, loader: 'style!css' },
        { test: /\.scss$/, loader: 'style!css!sass' },
      ]
    },
    resolve: {
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js'
        }
    }
}

