const webpack = require('webpack');
const path = require("path");
let baseurls = 'http://localhost:5000';
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': 'src',
        'assets': path.resolve(__dirname,'src/assets'),
        'components': path.resolve(__dirname,'src/components'),
        'network': path.resolve(__dirname,'src/network'),
        'utils': path.resolve(__dirname,'src/utils'),
        'views': path.resolve(__dirname,'src/views'),
      }
    },
    devServer: {
      disableHostCheck: true,
      proxy: {
        '/api': {
          target: baseurls, //设置你调用的接口域名和端口号 别忘了加http
          changeOrigin: true, //这里设置是否跨域
          pathRewrite: {
            '^/api': ''
          }
        }
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",

        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ],
  }
}
