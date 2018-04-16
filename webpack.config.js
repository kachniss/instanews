const path = require("path");

module.exports = {
    devtool: "source-map",
    entry: "./js/index.js",
    output: {
      filename: "bundle.js",
        path: path.resolve(__dirname, "build/js")
    },
    module: {
        rules: [
          // ...other loaders...
          {
            test: /\.scss$/,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader"
              },
              {
                loader: "sass-loader"
              }
            ]
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './fonts/'
                }
            }]
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './images/'
                }  
              }
            ]
          }
        ]
      }
};

  