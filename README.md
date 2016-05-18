#安装环境#
- nodejs
- npm
- npm使用淘宝源
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
UAT `http://180.169.45.105/MovieOps/`
PRD `???`

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

#Schedule#
_v1.1_
- 补js代码注释
- lodash替换为完整版（压缩后发现vendor.js大小很乐观），可大幅精简js代码
- 异步依赖执行rsvp.js
- 统一加载通用资源，存到localStorage或sessionStorage

_v2.0_
- jade模板
- sass预处理
- pjax，无刷新切换页面
- 缩减bootstrap依赖
- 缩减第三方js依赖

_v2.1_
- 引入handlebars.js，UI组建化