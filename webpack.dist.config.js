'use strict';
const path = require('path');
const webpack = require('webpack');

const outputPath = path.join(__dirname, 'dist');

const config = {
    entry: {
        app: './src/js/UnityBar.jsx',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'react'],
                },
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
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
    externals: [
        'react',
        'react-dom',
    ],
    output: {
        path: outputPath,
        filename: '',
        library: 'pwd-unitybar',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    }
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
        plugins: [
            new webpack.optimize.UglifyJsPlugin(),
        ],
    }),
];
