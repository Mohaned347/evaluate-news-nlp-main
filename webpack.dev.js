const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'bundle.js',  // Generated file
        path: path.resolve(__dirname, 'dist'),  // Path to output directory
      },

    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                test: /\.scss$/, // Target .scss files
                use: [
                  MiniCssExtractPlugin.loader, // Extract CSS into separate file
                  'css-loader', // Process CSS
                  'sass-loader', // Compile Sass to CSS
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}
