const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'static/js/bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        alias: {
            app: path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src/components'),
            routes: path.resolve(__dirname, './src/routes'),
            assets: path.resolve(__dirname, './src/assets'),
            models: path.resolve(__dirname, './src/models'),
        },
        extensions: ['.tsx', '.ts', '.js', '.css'],
        fallback: {
            fs: false,
        }
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: 'url-loader',
                options: {
                    limit: 8192,
                },
            },
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                exclude: [
                    /node_modules/,
                    /\.prod\.tsx?$/
                ],
                options: {
                    emitErrors: true,
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [
                    /node_modules/,
                    /\.prod\.tsx?$/
                ],
                options: {
                    configFile: 'tsconfig.json',
                }
            },
            {
                // Needed to load CSS files from packages. EG. leaflet.css
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'resolve-url-loader' },
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ]
};