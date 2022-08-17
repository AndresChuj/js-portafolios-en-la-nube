const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js', // punto de entrado
  output: {
    //nos permite saber donde se encuentra nuestro proyecto poner dist como estandar
    path: path.resolve(__dirname, 'dist'),
    //nombre del resultante
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  //para el mode desarrollo
  mode: 'development',
  //activacion del modo watch
  watch: true,

  //poner con que extensiones vamos a trabajar
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils':  path.resolve(__dirname, 'src/utils/'),
      '@templates':  path.resolve(__dirname, 'src/templates/'),
      '@styles':  path.resolve(__dirname, 'src/styles/'),
      '@images':  path.resolve(__dirname, 'src/assets/images'),
    }
  },
  module:{
      rules:[
      {
        //nos permite saber que tipo de extensiones vamos a usar
        test: /\.m?js$/,
        // excluir modulos
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|styl)/i,
        use: [miniCssExtractPlugin.loader, 
          'css-loader',
          'stylus-loader'
        ],
      },
      //para importar nuestras imagenes
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: "aplication/fot-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
        type: 'javascript/auto',
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      //hacer la insercion de los elementos
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new miniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new copyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
    //para variables de entorno
    new Dotenv()
  ],
}
