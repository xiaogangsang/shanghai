var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var bower_components = path.resolve(__dirname, 'bower_components');

var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), 'src');

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
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
    devtool: "source-map",
    entry: getEntry(),
    // {
    //     banner: path.resolve(srcDir, 'js/banner.js'),
    //     charge: path.resolve(srcDir, 'js/charge.js'),
    //     cinema: path.resolve(srcDir, 'js/cinema.js'),
    //     class: path.resolve(srcDir, 'js/class.js'),
    //     comment: path.resolve(srcDir, 'js/comment.js'),
    //     login: path.resolve(srcDir, 'js/login.js'),
    //     movie: path.resolve(srcDir, 'js/movie.js'),
    //     order: path.resolve(srcDir, 'js/order.js'),
    //     report: path.resolve(srcDir, 'js/report.js'),
    //     showtime: path.resolve(srcDir, 'js/showtime.js'),
    //     user: [path.resolve(srcDir, 'js/user.js'), 'multiselect'],
    //     vendor: ['jquery', 'bootstrap']
    // },
    output: {
        path: path.join(__dirname, "dist/js/"),
        publicPath: path.join(__dirname, "dist/js/"),
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    modulesDirectories: ['node_modules'],
    resolve: {
        //配置别名，在项目中可缩减引用路径
        alias: {
            'jquery': path.resolve(bower_components, 'jquery/dist/jquery.min.js'),
            'bootstrap': path.resolve(bower_components, 'bootstrap/dist/js/bootstrap.min.js'),
            'multiselect': path.resolve(bower_components, 'multiselect/js/multiselect.min.js'),
            'chosen': path.resolve(bower_components, 'chosen/chosen.jquery.js'),
            'handlebars': path.resolve(bower_components, 'handlebars/handlebars.js'),
            'lodash': path.resolve(bower_components, 'lodash/dist/lodash.min.js'),
            'parsley': path.resolve(bower_components, 'parsleyjs/dist/parsley.min.js'),
            'parsley-lang': path.resolve(bower_components, 'parsleyjs/dist/i18n/zh_cn.js'),
            'common': srcDir + "/lib/common.js"
        }
    },
    module: {
        noParse: ['jquery', 'bootstrap', 'multiselect', 'chosen', 'handlebars', 'lodash', 'parsley', 'parsley-lang'],
        //各种加载器，即让各种文件格式可用require引用
        loaders: [
            {
                test: path.resolve(bower_components, 'jquery/dist/jquery.min'),
                loader: 'expose?jQuery!expose?$'
            },
            {
                test: path.resolve(bower_components, 'handlebars/handlebars.js'),
                loader: 'expose?Handlebars'
            },
            {
                test: path.resolve(bower_components, 'lodash/dist/lodash.min.js'),
                loader: 'expose?_'
            },
            // { test: /\.css$/, loader: "style-loader!css-loader"},
            // { test: /\.less$/, loader: "style-loader!csss-loader!less-loader"}
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.woff$/,
                loader: 'url?limit=100000'
            }
        ]
    },
    plugins: [
        //提供全局的变量，在模块中使用无需用require引入
        // new webpack.ProvidePlugin({
        //     'jQuery': 'jquery',
        //     '$': 'jquery',
        //     'Handlebars': 'handlebars'
        // }),
        //将公共代码抽离出来合并为一个文件
        // new CommonsChunkPlugin("admin-commons.js", ["ap1", "ap2"]),
        // new CommonsChunkPlugin("commons.js", ["p1", "p2", "admin-commons.js"])
        // 在不同页面用<script>标签引入如下js:
        // page1.html: commons.js, p1.js
        // page2.html: commons.js, p2.js
        // page3.html: p3.js
        // admin-page1.html: commons.js, admin-commons.js, ap1.js
        // admin-page2.html: commons.js, admin-commons.js, ap2.js
        // new CommonsChunkPlugin('common.js'),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // new webpack.HotModuleReplacementPlugin()
    ]
};