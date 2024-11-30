const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'bundle.js',  // Generated file
        path: path.resolve(__dirname, 'dist'),  // Path to output directory
      },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate file
                    'css-loader', // Process CSS
                    'sass-loader', // Compile Sass to CSS
                  ]
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new WorkboxPlugin.GenerateSW(),

        new MiniCssExtractPlugin({
            filename: 'styles.css',  // The output CSS file
          }),
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}
