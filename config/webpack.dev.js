let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let commonConfig = require('./webpack.common.js');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let helpers = require('./helpers');

const ENV = process.env.ENV = process.env.NODE_ENV = 'dev';

commonConfig.entry.app = './src/app/main';
commonConfig.module.rules.push({
    test: /\.ts$/,
    use: [
        '@angularclass/hmr-loader',
        'awesome-typescript-loader',
        'angular2-router-loader',
        'angular2-template-loader'
    ]
});

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new BrowserSyncPlugin({
            open: false,
            port: 9000,
            proxy: 'http://localhost:8080/'
        },
        {
            reload: false
        })
    ],

    devServer: {
        // historyApiFallback: true,
        stats: 'minimal'
    }
});
