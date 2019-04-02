const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        app: './App.jsx',
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
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '0.0.0.0',
            analyzerPort: 7778,
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
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                use: [
                    {
                        loader: require.resolve('prettier-loader'),
                        options: {
                            resolveConfigOptions: {
                                editorconfig: true,
                                config: './.prettierrc.json',
                            },
                        },
                    },
                ],
                exclude: /node_modules/,
            },
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
        clientLogLevel: 'warning',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
