var gulp = require('gulp'),
    os = require('os'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    gulpOpen = require('gulp-open'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    md5 = require('gulp-md5-plus'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    base64 = require('gulp-css-base64'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    browserSync = require('browser-sync');

//将图片拷贝到目标目录
gulp.task('copy:images', function (done) {
    gulp.src(['src/images/**/*']).pipe(gulp.dest('dist/images/')).on('end', done);
});

//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
gulp.task('lessmin', function (done) {
    gulp.src(['src/css/*.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'])
        // .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css/'))
        .on('end', done);
});

//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js'], function (done) {
    gulp.src('dist/js/*.js')
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/js'))
        .on('end', done);
});

//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', [/*'sprite'*/], function (done) {
    gulp.src('dist/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
    gulp.src('dist/css/*.css')
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    gulp.src(['src/app/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dist/app'))
        .on('end', done);
});

gulp.task('clean', function (done) {
    gulp.src(['dist'])
        .pipe(clean())
        .on('end', done);
});

gulp.task('watch', function (done) {
    gulp.watch('src/**/*', ['lessmin', 'build-js', 'fileinclude'])
        .on('change', browserSync.reload)
        .on('end', done);
});

gulp.task('connect', function () {
    browserSync.init({
        server: {
            baseDir: "dist/",
            directory: true
        },
        reloadDelay: 500
    });
});

var myDevConfig = Object.create(webpackConfig);

var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task("build-js", ['fileinclude'], function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//发布
gulp.task('default', ['connect', 'fileinclude', 'md5:css', 'md5:js', 'open']);

//开发
gulp.task('dev', ['connect', 'copy:images', 'fileinclude', 'lessmin', 'build-js', 'watch']);