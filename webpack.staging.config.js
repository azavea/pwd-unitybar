const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './App.jsx',
        vendor: [
            'react',
            'react-dom',
        ]
    },
    output: {
        path: path.join(__dirname, 'staging'),
        filename: "pwd.unitybar.[hash].js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('staging'),
            },
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.jsx?$/,
            options: {
                eslint: {
                    configFile: '.eslintrc',
                },
            },
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'demo.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options:
                {
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
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|gif|png|svg|ttf|eot|woff|woff2)$/,
                use: 'url-loader',
            },
            {
                test: /\.jsx?/,
                exclude: [/node_modules/, /\.json$/],
                loader: 'eslint-loader',
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
