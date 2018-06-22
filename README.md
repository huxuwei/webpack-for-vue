
### 简介
 webpack4.0从零配置实现简单的vue项目配置
- 

 #### 运行
 ```
 npm i
 npm run dev
 ```

 ## 记录


### vue + webpack

1. 安装webpack、webpack-cli（webpack4.0以上需要安装） 
2. 安装vue-loader
  - 解析.vue 的文件
  - v15 的版本需要以插件方式引入才能正常使用
3. 创建html文件
  - 安装 html-webpack-plugin 插件 （引用后会生成默认的html文件）
  - 配置模板
4. 安装vue
  - 默认会引入运行时版本
  - 引入完成版需要配置
  - 参考：https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6
  ```
  module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  }
}

```

5. 安装
 - css-loader,style-loader 解析样式 .css
 - 
 
6. 配置babel
 - 安装 babel-loader babel-core babel-preset-env
 - 配置 babel-loader
 - 
7. 配置预处理器scss
  - npm install -D sass-loader node-sass
  - 配置loader
  

8. 配置postcss-loader
 - 参考 https://www.cnblogs.com/wang715100018066/p/7049981.html
 - https://github.com/ecmadao/Coding-Guide/blob/master/Notes/CSS/PostCSS%E9%85%8D%E7%BD%AE%E6%8C%87%E5%8C%97.md
 - https://www.imooc.com/qadetail/252850?lastmedia=1
 - 安装postcss-loader，并使用postcss下的 autoprefixer插件（css3会自动添加前缀）
 
```
{
    loader: 'postcss-loader',
    options: {
        plugins:[require('autoprefixer')],
        browsers:['last 10 versions']
    }
}
```

 
9. 提取css（将css提取为单独的css文件，请在生产模式下开启，否则无法热加载）
- npm install -D mini-css-extract-plugin
- 
```
    {
    test: /\.css$/,
    use: [
        // 'style-loader',
        MiniCssExtractPlugin.loader,
        ]
    }
 plugins:[
        //提取css文件，请在生产环境下使用，否则无法热加载css
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
]


``` 


10. 配置图片文件
 - npm i url-loader file-loader -D
 - url-loader会将小于limit大小的图片以base64方式，以减少http请求
 - 大于的file-loader 进入处理
 - 
 
11. 配置webpack-dev-server
 - 
 
12.清空打包输出目录 
- npm i -D clean-webpack-plugin
```
const cleanWebpackPlugin = require('clean-webpack-plugin')
new cleanWebpackPlugin([path.join(__dirname,'dist')]),
```

13. 配置webpack-dev-server
 - npm i webpack-dev-server -D
 ```
 plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),//用户名替代id
 ]
 devServer:{
        contentBase: path.join(__dirname,'dist'),
        compress: true,
        host:'localhost',
        port: 9000,
        hot: true //开启热更新
    }
 ```

14. Scope Hoisting  
- 作用域提升，这是在webpack3中所提出来的。它会使代码体积更小，因为函数申明语句会产生大量代码.
```
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
plugins: [
// 开启 Scope Hoisting
new ModuleConcatenationPlugin(),
],
```
链接：https://juejin.im/post/5ac42d5c6fb9a028b617b851

15. js优化

- npm i webpack-parallel-uglify-plugin -D
```
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
plugins: [
new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false, //不需要格式化
          comments: false //不保留注释
        },
        compress: {
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    })
]

作者：yanyongchao
链接：https://juejin.im/post/5ab7c222f265da237f1e4434
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

```


#### 参考：
    - vue-loader 官方文档 
    - webpack官方文档  
    - 文章： https://juejin.im/post/5ab79fa75188255582525400  
    - https://juejin.im/post/5abef5e96fb9a028e33b9035