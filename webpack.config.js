const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  entry: {
    vuefetch: [
      './dev/dev.js',
      'webpack/hot/dev-server'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  resolveLoader: {
    modules: ["node_modules"],
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 3000,
    historyApiFallback: true,
    hot: true,
    hotOnly: true,
    inline: false,
    open: true,
    proxy: {
      '/api': {
        target: "http://localhost",
        secure: false
      }
    },
    setup(app) {
      app.all('/api/get', function (req, res) {
        res.json({ plugins: 'vuefetch' });
      });
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      inject: true
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('development'),
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
