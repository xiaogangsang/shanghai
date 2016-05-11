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
gulp.task('copy', function (done) {
  gulp.src(['src/images/**/*']).pipe(gulp.dest('dist/images/'));
  gulp.src(['src/fonts/**/*']).pipe(gulp.dest('dist/fonts/'));
  gulp.src(['src/lib/**/*']).pipe(gulp.dest('dist/lib/')).on('end', done);
});

//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
gulp.task('build-css', function (done) {
  gulp.src(['src/css/*.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'])
  .pipe(cssmin())
  .pipe(gulp.dest('dist/css/'))
  .on('end', done);
});

//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js'], function (done) {
  gulp.src('dist/js/*.js')
  .pipe(md5(10, 'dist/app/*.html'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js')).on('end', done);
});

//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', function (done) {
  gulp.src(['src/css/*.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'])
  .pipe(md5(10, 'dist/app/*.html'))
  .pipe(gulp.dest('dist/css'))
  .on('end', done);
});

//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
  gulp.src(['src/app/*.html'])
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file',
  }))
  .pipe(gulp.dest('dist/app'))
  .on('end', done);
});

gulp.task('clean', function (done) {
  gulp.src(['dist/**/*'])
  .pipe(clean())
  .on('end', done);
});

gulp.task('watch', function (done) {
  gulp.watch('src/**/*', ['build-css', 'build-js', 'fileinclude'])
  .on('change', browserSync.reload)
  .on('end', done);
});

gulp.task('connect', function () {
  browserSync.init({
    server: {
      baseDir: 'dist/',
      directory: true,
    },
    reloadDelay: 500,
  });
});

var myDevConfig = Object.create(webpackConfig);

var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task('build-js', ['fileinclude'], function (callback) {
  devCompiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError('webpack:build-js', err);
    gutil.log('[webpack:build-js]', stats.toString({
      colors: true,
    }));
    callback();
  });
});

//发布
gulp.task('dist', ['clean', 'fileinclude', 'copy', 'md5:css', 'md5:js']);

//开发
gulp.task('dev', ['connect', 'clean', 'fileinclude', 'copy', 'build-css', 'build-js', 'watch']);
