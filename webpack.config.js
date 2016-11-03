var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var path = require('path');
var nodeModules = path.resolve(__dirname, 'node_modules');
var bowerComponents = path.resolve(__dirname, 'bower_components');

var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), 'src');

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
  var jsPath = path.resolve(srcDir, 'js');
  var dirs = fs.readdirSync(jsPath);
  var matchs = [];
  var files = {};
  dirs.forEach(function (item) {
    matchs = item.match(/(.+)\.js$/);
    if (matchs) {
      files[matchs[1]] = path.resolve(srcDir, 'js', item);
    }
  });

  return files;
}

module.exports = {
  cache: true,
  devtool: 'source-map',
  entry: getEntry(),
  output: {
    path: path.join(__dirname, 'dist/js/'),
    publicPath: path.join(__dirname, 'dist/js/'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
  },
  modulesDirectories: ['node_modules'],
  resolve: {
    //配置别名，在项目中可缩减引用路径
    alias: {
      jquery: path.resolve(bowerComponents, 'jquery/dist/jquery.min.js'),
      bootstrap: path.resolve(bowerComponents, 'bootstrap/dist/js/bootstrap.min.js'),
      multiselect: path.resolve(bowerComponents, 'multiselect/dist/js/multiselect.min.js'),
      chosen: path.resolve(bowerComponents, 'chosen/chosen.jquery.js'),
      mustache: path.resolve(bowerComponents, 'mustache.js/mustache.js'),
      lodash: path.resolve(bowerComponents, 'lodash/dist/lodash.core.js'),
      parsley: path.resolve(bowerComponents, 'parsleyjs/dist/parsley.min.js'),
      'parsley-cn': path.resolve(bowerComponents, 'parsleyjs/dist/i18n/zh_cn.js'),
      cookie: path.resolve(bowerComponents, 'js-cookie/src/js.cookie.js'),
      echarts: path.resolve(bowerComponents, 'echarts/dist/echarts.js'),
      datetimepicker: srcDir + '/lib/bootstrap-datetimepicker.min.js',
      'datetimepicker-cn': srcDir + '/lib/bootstrap-datetimepicker.zh-CN.js',
      common: srcDir + '/common/common.js',
      settlementCommon: srcDir + '/common/common-settlement.js',
    },
  },
  module: {
    noParse: [
    'jquery',
    'cookie',
    'bootstrap',
    'multiselect',
    'chosen',
    'mustache',
    'lodash',
    'parsley',
    'parsley-cn',
    'datetimepicker',
    'datetimepicker-cn',
    'echarts',
    ],

    //各种加载器，即让各种文件格式可用require引用
    loaders: [
    {
      test: path.resolve(bowerComponents, 'jquery/dist/jquery.min'),
      loader: 'expose?jQuery!expose?$',
    },
    {
      test: path.resolve(bowerComponents, 'mustache.js/mustache.js'),
      loader: 'expose?Mustache',
    },
    {
      test: path.resolve(bowerComponents, 'lodash/dist/lodash.min.js'),
      loader: 'expose?_',
    },
    {
      test: path.resolve(bowerComponents, 'js-cookie/src/js.cookie.js'),
      loader: 'expose?Cookies',
    },
    {
      test: path.resolve(bowerComponents, 'echarts/dist/echarts.js'),
      loader: 'expose?echarts',
    },

    // {
    //   test: /\.jsx?$/,
    //   loader: 'babel',
    //   query: {
    //     presets: ['es2015'],
    //   },
    // },
    // {
    //   test: /\.woff$/,
    //   loader: 'url?limit=100000',
    // },
    ],
  },
  plugins: [

  //提供全局的变量，在模块中使用无需用require引入
  // new webpack.ProvidePlugin({
  //     'jQuery': 'jquery',
  //     '$': 'jquery'
  // }),
  //将公共代码抽离出来合并为一个文件
  // new CommonsChunkPlugin("upload.js", ["jquery.ui.widget.js", "jquery.iframe-transport.js", "jquery.fileupload.js"]),
  // new CommonsChunkPlugin("commons.js", ["p1", "p2", "admin-commons.js"])
  // 在不同页面用<script>标签引入如下js:
  // page1.html: commons.js, p1.js
  // page2.html: commons.js, p2.js
  // page3.html: p3.js
  // admin-page1.html: commons.js, admin-commons.js, ap1.js
  // admin-page2.html: commons.js, admin-commons.js, ap2.js
  // new CommonsChunkPlugin('common.js'),
  // new uglifyJsPlugin({
  //     compress: {
  //         warnings: false
  //     }
  // }),
  // new webpack.HotModuleReplacementPlugin()
  ],
};
