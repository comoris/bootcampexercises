var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var webpack = require("webpack");

function webpackConfigFactory(env) {

    var env = env || 'dev';

    //
    // basic setup
    //
    var config = {

        cache: true,

        entry: './app/scripts/app.js',

        output: {
            path: (env == 'prod') ? __dirname + '/dist/bundle' : __dirname + '/app/bundle',
            filename: (env == 'prod') ? '[name]-[hash]-chunk.js' : '[name].js',
            publicPath: 'bundle/'
        },

        module: {
            preLoaders: [],
            loaders: [
                { test: /\.css$/, exclude: /node_modules/, loader: 'style!css'},
                { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
                { test: /\.html$/, loader: 'raw' },
            ]
        },

        resolve: {
            alias: {
              'handlebars': 'handlebars/dist/handlebars.js'
            }
        },

        plugins: [],

        devtool: 'source-map',

        debug: true,

        devServer: {
            contentBase: './app',
            stats: {
                version: false,
                colors: true,
                chunks: false,
                children: false,
            },
        }
    }

    //
    // Environment dependent setup
    //
    switch(env) {
        case 'prod':
            config.cache = false;
            config.debug = false;

            // create dist/index.html (with injected bundles)
            config.plugins.push(new HtmlWebpackPlugin({
                filename: '../index.html',
                pkg: require('./package.json'),
                template: './app/index-template.html'
            }))

            // extract css from bundle
            config.plugins.push(new ExtractTextPlugin('style-[hash].css'));
            config.module.loaders.push(
                { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
            )

            // minimize JS
            config.plugins.push(new webpack.optimize.UglifyJsPlugin());
            break;

        case 'dev':
            config.module.loaders.push(
                { test: /\.scss$/, loader: 'style!css!sass' }
            )
            config.module.preLoaders.push({
                test: /\.js$/,
                loader: 'eslint',
                exclude: /(node_modules)/,
            });
            break

        default:
            console.warn('Unknown or undefined NODE_ENV. Please refer to package.json for available build commands.');
            break;
    }

    return config;
}

module.exports = webpackConfigFactory;
