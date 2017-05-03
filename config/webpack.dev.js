const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const helpers = require('./helpers');
// const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');

const ENV = process.env.ENV = process.env.NODE_ENV = 'dev';

commonConfig.module.rules.push({
    test: /\.ts$/,
    use: [
        // '@angularclass/hmr-loader',
        'awesome-typescript-loader',
        'angular2-router-loader',
        'angular2-template-loader'
    ]
});
module.exports = webpackMerge(commonConfig, {
    devtool: 'eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        // new TsConfigPathsPlugin(),
        // new CheckerPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new BrowserSyncPlugin({
            open: false,
            notify: false,
            port: 9000,
            proxy: 'http://localhost:8080/'
        },
        {
            reload: false
        })
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
