const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

var config = {
    context: __dirname + '/src',
    entry: {
        app: './demo.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: 'dist.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './*.html', to: '' },
            { from: './images', to: 'images' },
            { from: './css', to: '' },
            { from: './js', to: '' },
            { from: './assets', to: 'assets' }
        ]),
    ]
};

module.exports = config;
