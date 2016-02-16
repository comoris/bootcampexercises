# Webpack

    - webpack bundelt uw jsmodules/assets in javascript files
    - modules kunnen in commonJs of Amd zijn
    - tijdens het bundel-process kunnen we een hoop taken laten runnen op de jsmoduels/asssets

webpack kan bv ook:
**HtmlWebpackPlugin**
- via plugin uw index-file op basis van template laten renderen

### Setup
- npm init
- npm install webpack --save-dev
- config file

### Config
```
<!-- language: lang-js -->
    module.exports = {
        entry: './main.js',
        output: {
            path: __dirname + '/dist'
            filename: 'bundle.js',
            publicPath: "/assets/"
        },
        resolve: {
            root: __dirname,
            extensions: ['', '.ts', '.js', '.json'],
        },
        module: {
            loaders: [...],
            preLoaders: [...],
        },
        plugins: [...]
    };
```


