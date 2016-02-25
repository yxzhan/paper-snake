var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
module.exports = {
    entry: {
        main: "./main.es6"
    },
    output: {
        path: path.resolve(__dirname, '..'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader!postcss-loader")
            },
            {
                test: /\.png$/,
                loader: 'url-loader?mimetype=image/png'
            },
            {
                test: /\.es6|\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            }

        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    resolve: {
        root: path.resolve('.'),
        extensions: ['', '.js']
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
};