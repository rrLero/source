const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

const ENV = process.env.NODE_ENV;

module.exports = {
    entry: {
        polyfills: './src/app/polyfills',
        vendor: './src/app/vendor',
        app: './src/app/main'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.html', '.css', '.scss', '.xlf'],
        modules: [helpers.root('src'), 'node_modules'],
        alias: {
            modules: helpers.root('src/app/modules'),
            services: helpers.root('src/app/services'),
            directives: helpers.root('src/app/directives'),
            pipes: helpers.root('src/app/pipes'),
            components: helpers.root('src/app/components'),
            shared: helpers.root('src/app/shared'),
            models: helpers.root('src/app/models'),
            animations: helpers.root('src/app/animations'),
            public: helpers.root('public')
        }
    },

    module: {
        rules: [{
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.(woff|woff2|ttf|eot|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/img/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.json$/,
                include: [
                    helpers.root('public/i18n')
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/i18n/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.htaccess$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './.htaccess'
                    }
                }]
            },
            {
                test: /\.(scss|sass|css)$/i,
                include: [
                    helpers.root('public/css'),
                    helpers.root('node_modules')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: ENV === 'production',
                                // sourceMap: ENV !== 'production'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.xlf$/,
                use: 'raw-loader'
            },
            {
                test: /\.scss$/,
                include: [
                    helpers.root('src/app'),
                ],
                use: ['raw-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), {}
        ),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunksSortMode: helpers.packageSort(['polyfills', 'vendor', 'app'])
        })
    ]
};
