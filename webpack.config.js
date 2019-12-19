const extracss = require('extract-text-webpack-plugin'); // 安装时要安装extract-text-webpack-plugin@next 才支持webapck4.0版本 分离css文件，打包为app2.mini.css
const minicss = require('mini-css-extract-plugin'); // 此插件功能同上，只是可以在打包文件名称中假如hash，如上不行
module.exports = {
    mode: 'development', // production
    // entry: './app.js',
    // entry: [
    //     './app.js',
    //     './app2.js'
    // ],
    entry: {
        app: ['./app.js', 'babel-polyfill'],
        app2: './app2.js'
    },
    output: {
        // filename: './[name].[hash:4].js'
        filename: './[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: [
                    //         [
                    //             '@babel/preset-env',
                    //             {
                    //                 targets: { // 以浏览器为衡量标准，占有率大于百分之一，兼容最后两个版本，不需要兼容IE8以下的版本
                    //                     browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
                    //                     // node: '10.16.0' // 以 node为目标 es6的语法不会被编译
                    //                     // chrome: '59' // 也不会被编译
                    //                 }
                    //             }
                    //         ]
                    //     ],
                    //     plugins: [
                    //         '@babel/transform-runtime'
                    //     ]
                    // }
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                // mini-css-sextract-plugin
                use: [
                    {
                        loader: minicss.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true, // css模块化
                            modules: {
                                // localIdentName: '[path]_[name]_[local]_[hash]'
                                localIdentName: '[local]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        // 第一个自动加前缀
                        // postcss-cssnext
                        // 雪碧图
                        // 必须紧贴着css-loader之后
                        options: {
                            ident: 'postcss', // 安装是安装postcss  和postcss-loader
                            plugins: [
                                require('autoprefixer')(), // 需要兼容不同的浏览器，自动加前缀
                                require('postcss-cssnext')() // 定义变量
                            ]
                        }
                    }
                ]
                // use: extracss.extract({ // extract-text-webpack-plugin
                //     fallback: {
                //         loader: 'style-loader'
                //     },
                //     use: [
                //         {
                //             loader: 'css-loader',
                //             options: {
                //                 // modules: true, // css模块化
                //                 modules: {
                //                     // localIdentName: '[path]_[name]_[local]_[hash]'
                //                     localIdentName: '[local]'
                //                 }
                //             }
                //         },
                //         {
                //             loader: 'postcss-loader',
                //             // 第一个自动加前缀
                //             // postcss-cssnext
                //             // 雪碧图
                //             // 必须紧贴着css-loader之后
                //             options: {
                //                 ident: 'postcss', // 安装是安装postcss  和postcss-loader
                //                 plugins: [
                //                     require('autoprefixer')(), // 需要兼容不同的浏览器，自动加前缀
                //                     require('postcss-cssnext')() // 定义变量
                //                 ]
                //             }
                //         }
                //     ]
                // })
                /* // style-loader处理后的css插入到html中
                // css-loader让css文件可以正确的解析
                // loader文件是从下往上处理
                {
                    loader: 'style-loader',
                    // options: { // 基本不用这个配置
                    //     insert: 'body'
                    // }
                },
                {
                    loader: 'css-loader',
                    options: {
                        // modules: true, // css模块化
                        modules: {
                            // localIdentName: '[path]_[name]_[local]_[hash]'
                            localIdentName: '[local]'
                        }
                    }
                },
                {
                    loader: 'postcss-loader',
                    // 第一个自动加前缀
                    // postcss-cssnext
                    // 雪碧图
                    // 必须紧贴着css-loader之后
                    options: {
                        ident: 'postcss', // 安装是安装postcss  和postcss-loader
                        plugins: [
                            require('autoprefixer')(), // 需要兼容不同的浏览器，自动加前缀
                            require('postcss-cssnext')() // 定义变量
                        ]
                    }
                }
            ]*/
            }
        ]
    },
    plugins: [
        /*new extracss({
            filename: '[name].min.css'
        })*/
        new minicss({
            filename: "[name].mini.css"
        })
    ]
}