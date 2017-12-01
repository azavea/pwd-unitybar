const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './Demo.jsx',
        vendor: [
            'react',
            'react-dom',
        ]
    },
    output: {
        path: __dirname,
        filename: "pwd.unitybar.[hash].js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.pwd.unitybar.[hash].js',
            minChunks: Infinity,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
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
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options:
            {
                presets:['es2015', 'react'],
                plugins: ['transform-class-properties'],
                env: {
                    development: {
                        presets: ['react-hmre'],
                    },
                },
            },
        },
        {
            test: /\.(css|scss)$/,
            exclude: /node_modules/,
            use: [
                'style-loader',
                'css-loader',
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
        }]
    },
    devServer: {
        historyApiFallback: {
            index: '/',
            host: '0.0.0.0',
        },
        disableHostCheck: true,
        hot: true,
        overlay: true,
        stats: 'minimal',
        watchOptions: {
            poll: true,
        },
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
