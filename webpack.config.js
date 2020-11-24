const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",

    module: {
      rules: [

        {
            test:/\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader'
                }
            ]
             
        },
        //Loading images
        {
          test: /\.(png|jpe?g|gif)$/i,
          use:[
              {
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                    name: '[name]-[sha1:hash:7].[ext]'
                }
              }
          ]
        },
        //Loading fonts
        {
            test: /\.(ttf|otf|eot|woff|woff2)$/,
            use:[
                {
                  loader: 'file-loader',
                  options: {
                      outputPath: 'fonts',
                      name: '[name].[ext]'
                  }
                }
            ]
          },
        //CSS
          {
            test: /\.(css)$/,
            use:[ MiniCssExtractPlugin.loader,'css-loader']
          },
          // Loading SASS|SCSS
          {
            test: /\.(sсss)$/,
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: 'svg-url-loader',
                options: {
                  outputPath: 'svg',
                  name: '[name]-[sha1:hash:7].[ext]',
                  limit: 10000,
                },
              },
            ],
          }
        
      ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title:  'Hello World',
            buildTime: new Date(),
            template:'public/index.html'
        }),
         new MiniCssExtractPlugin()
    ]
};
          