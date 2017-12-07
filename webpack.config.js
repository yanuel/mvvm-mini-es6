  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: {
     app: './src/app.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    module: {
      loaders: [
        {
            test: /\.js$/, 
            loader: 'babel-loader', 
            query: {
                presets: [
                    "es2015",
                    "stage-0",
                    "stage-1",
                    "stage-2",
                    "stage-3"
                ]
            },
            exclude: '/node_modules/'
        }
      ]
    }
  };