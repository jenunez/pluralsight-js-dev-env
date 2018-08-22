import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },

  plugins: [
    //Use CommosChunkPluging to create a seaprate bundle
    //of vendor libraries so the the're cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    //Create HTML file that includes reference to bundle JS
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments:true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    //Eliminate duplicate packages when generatin bundle
    new webpack.optimize.DedupePlugin(),

    //Minify JS
    new webpack.optimize.UglifyJsPlugin ()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
