'use strict';
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const outputPath = path.join(__dirname, 'dist');

const config = {
    entry: {
        app: './src/js/index.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                    ],
                },
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|gif|png|svg|ttf|eot|woff|woff2)$/,
                use: 'url-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
            umd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
            umd: 'react-dom',
        },
    },
    output: {
        path: outputPath,
        filename: '',
        library: 'pwd-unitybar',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
};

module.exports = [
    Object.assign({}, config, {
        output: Object.assign({}, config.output, {
            filename: 'pwd.unitybar.js',
        }),
    }),
    Object.assign({}, config, {
        output: Object.assign({}, config.output, {
            filename: 'pwd.unitybar.min.js',
        }),
        optimization: {
            minimize: true,
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
            }),
        ]
    }),
];
