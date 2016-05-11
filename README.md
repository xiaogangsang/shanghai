#安装环境#
- nodejs
- npm

#npm使用淘宝源cnpm#
```
alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"
```

#安装依赖#
`cnpm install bower -g`
`cnpm install webpack -g`
`cnpm install gulp -g`
`cnpm install`
`bower install`

#命令#
开发：`gulp dev`
发布：`gulp release`

#后端接口#
UAT：`http://180.169.45.105/MovieOps/`

#文件&目录说明#
- `.jscsrc` javascript代码规范
- `bower.json` 第三方javascript组件
- `package.json` npm依赖组件
- `webpack.config.js` webpack配置文件
- `gulpfile.js` gulp配置文件
- `src` 源文件目录
- `dist` 打包目录
    - `dist/app` 项目html
    - `dist/common` 项目基础共用js
    - `dist/css` 项目css
    - `dist/fonts` 项目字体
    - `dist/images` 项目图片
    - `dist/js` 项目js文件
    - `dist/lib` 无法用webpack打包的第三方js库