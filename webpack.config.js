const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ASSET_PATH = process.env.ASSET_PATH || '/'
const NODE_ENV = process.env.NODE_ENV|| 'development'

module.exports = {
  entry: {},
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
  }
}

if (NODE_ENV === 'production') {
  module.exports.entry.vuefetch = [
    './index.js'
  ]
  module.exports.output = {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: "vuefetch",
    libraryTarget: "umd"
  },
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('production'),
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
  module.exports.devtool = 'source-map'
} else {
  module.exports.entry.vuefetch = [
    './index.js'
  ]
  module.exports.output = {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module.exports.devServer = {
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
  module.exports.plugins = (module.exports.plugins || []).concat([
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
  ])
  module.exports.devtool = '#eval-source-map'
}
