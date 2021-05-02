const path 				= require('path');
const webpack 			= require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',

  output: {
  	// 打包输出路径
    path: path.resolve(__dirname, 'dist'),
    // 访问路径：从根目录开始 + /dist/ + dist下面的index.html里的js的路径：js/app.js 
    // 不加publicPath的话，会少一层路径
    publicPath: '/dist/',
    filename: 'js/app.js'
  },

  resolve:{
    alias: {
      // 用于解决import组件的路径问题：__dirnam：在当前文件所在目录，也就是根目录下，找src/page,如果需要改变，直接在这里改变就好了
      page          : path.resolve(__dirname, 'src/page'),
      component     : path.resolve(__dirname, 'src/component'),
      util          : path.resolve(__dirname, 'src/util'),
      service       : path.resolve(__dirname, 'src/service')
    }
  },

  module: {
  rules: [
  	// react(jsx)语法的处理，环境上支持react的写法
  	// 为jsx扩展名的文件做一个loader(babel-loader/core)
  	// preset的env作为babel环境转换的工具，react为babel-preset-react
  	// 并且装了react，react-dom
    {
      test: /\.m?jsx$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env','react']
        }
      }
    },
    // css文件的处理
    {
        test: /\.css$/,
         use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
    },
    // sass文件的处理
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
    },
    // 图片的配置
    {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 文件大于8k的时候，才单独成一个文件
              limit: 8192,
              // 存放位置dist/resource
              name: 'resource/[name].[ext]'
            }
          }
        ]
     },
     // 字体图标的配置
     {
     	// 都是字体，为了兼容才出那么多格式
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 文件大于8k的时候，才单独成一个文件
              limit: 8192,
              // 存放位置dist/resource
              name: 'resource/[name].[ext]'
            }
          }
        ]
     }
  ]
},

  plugins: [
    // 处理html文件 - 存储位置暴露出去
  	new HtmlWebpackPlugin({
  		template: './src/index.html',
      favicon: './favicon.ico'
  	}),
  	// 独立css文件 - 存储在根目录下css/[name].css
  	new ExtractTextPlugin("css/[name].css"),
  	// 提出公共模块
  	new webpack.optimize.CommonsChunkPlugin({
  		name: 'common',
  		filename: 'js/base.js'
  	})
  ],

  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    port: 9009,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    // proxy : {
    //     '/query?' : {
    //         target: 'http://13.57.28.139:8000',
    //         changeOrigin : true
    //     }
    // }

    // // contentBase: './dist'
  }
};






