const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    // mode: 'production',
    entry: {
        app: './src/app/app.js'
    },
    // devtool: 'inline-source-map',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].bundle.js',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [require('babel-plugin-angularjs-annotate')]
                    }
                }
                // , {
                //     loader: 'eslint-loader',
                //     options: {
                //         fix: true
                //     }
                // }
            ],
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            /* 分离Html文件进入JS文件中方式, */
            // use: [{
            //     loader: 'file-loader',
            //     options: {
            //         name: '[path][name].[ext]'
            //     }
            // }]
            /* 混合Html文件进入JS文件中方式, */
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeComments: false,
                    collapseWhitespace: false
                }
            }],
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader',
                options: {
                    url: false
                }
            }],
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: /node_modules/
        }, {
            test: /\.(sass|scss)$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ],
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: /node_modules/
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts/'
                }
            }],
            include: [
                path.resolve(__dirname, 'src/assets')
            ],
            exclude: /node_modules/
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: 'assets/img/',
                    outputPath: 'assets/img/'
                }
            }],
            include: [
                path.resolve(__dirname, 'src/assets')
            ],
            exclude: /node_modules/
        }]
    },

    devServer: {
        host: '0.0.0.0',
        index: 'index.html',

        // publicPath: '/',
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,

        proxy: {
            '/ecas/api': 'http://127.0.0.1:8888',
            '/ecas/auth': 'http://127.0.0.1:8888',
            '/ecas/static/horizon': 'http://127.0.0.1:8888',
            '/ecas/media': 'http://127.0.0.1:8888'
        },

        // hot: true,
        historyApiFallback: true
    },

    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    //     aggregateTimeout: 500,
    //     poll: 1000
    // },

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            // new UglifyJsPlugin({ test: /\.js(\?.*)?$/i })
            // 压缩
            // new UglifyJsPlugin({
            //     cache: true,
            //     parallel: true
            // })
        ]
    },

    stats: {
        entrypoints: false,
        children: false
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new CopyWebpackPlugin([{
        //     from: '../assets/**/*',
        //     to: '../dist',
        //     ignore: ['*.js', '*.scss', '*.sass']
        // }]),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
            allChunks: true
        }),
        new OptimizeCSSAssetsPlugin(),
        new NgAnnotatePlugin({
            add: true
            // other ng-annotate options here
        })
    ]
};
