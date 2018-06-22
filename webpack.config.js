const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const WebpackParalleUglifyPlugin = require('webpack-parallel-uglify-plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }

module.exports = {
    //模式
    mode:'development',
    //入口文件
    entry: './src/index.js',
    //输出
    output:{
        filename: 'build.js',
        path: path.resolve('dist')
    },
    
    resolve:{
        //引入文件时，不加后缀名按以下顺序查找
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',//引入完成版需要配置
            '@': resolve('src'),
        }
    },
    module:{
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            //配置css文件，并使用postcss提取css
            {
                test: /\.css|scss$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options:{ 
                            importLoaders: 1,
                            modules: true  //开启css Modules
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins:[require('autoprefixer')],
                            browsers:['last 10 versions']
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            //配置图片文件
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[
                    {
                        loader: 'url-loader',
                        options:{
                            outputPath: 'images/',// 图片输入路径
                            limit: 5*1024 // 转化为base64的限制大小
                        }
                    }
                ]
            },
            //配置babel
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['babel-preset-env'],
                    plugins: ['babel-plugin-transform-runtime']
                  }
                }
              }
        ]
    },
    // postcss:[autoprefixer({browsers:['last 2 versions']})],
    plugins:[
        new WebpackParalleUglifyPlugin({
            uglifyJS:{
                output:{
                    beautify:false,
                    comments: false
                },
                compress: {
                    warnings: false,
                    drop_console: true,
                    collapse_vars: true,
                    reduce_vars: true
                }
            }
        }),
        new VueLoaderPlugin(),
        //提取css文件，请在生产环境下使用，否则无法热加载css
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),//用户名替代id
        //清除生成目录
        new cleanWebpackPlugin([path.join(__dirname,'dist')]),
        // require('autoprefixer')({browsers:'last 5 versions'}),
        /**
         * 生成html文件
         * filname: 生成文件名称
         * template： 文件模板路径
         * inject: script标签注入的位置，默认true，放在body的底部
         * 参考：https://segmentfault.com/a/1190000007294861
         */
        new HtmlWebpackPlugin({
            filename:'index.html', 
            template: path.resolve(__dirname,'./index.html'),
            inject: true,
            hash: true, //防止缓存
            minify:{
                removeAttributeQuotes: true //压缩 去掉引号
            }
        })
    ],
    devServer:{
        contentBase: path.join(__dirname,'dist'),
        compress: true,
        host:'localhost',
        port: 9000,
        hot: true
    }

}