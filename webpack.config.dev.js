const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry: "./src/main.ts",
    mode:'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js"
    },
    devServer: {
        open: false
    },
    resolve:{
        "extensions" :['.ts','.js','.json']
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude:[
                    path.resolve(__dirname,'src/components')//排除需要模块化的样式，防止样式冲突
                ]
            },
            {
                test:/\.css$/,
                use: ['style-loader',{
                    loader:'css-loader',
                    options:{
                        modules: {
                            localIdentName: "[path][name]__[local]--[hash:base64:5]"
                        },

                    }
                }],
                include:[
                    path.resolve(__dirname,'src/components')
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource' //可以帮助我们载入任何类型资源
            },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,  // 匹配字体文件
            //     use: [
            //       {
            //         loader: 'url-loader',
            //         options: {
            //           name: 'fonts/[name][hash:8].[ext]', // 体积大于 10KB 打包到 fonts 目录下
            //           limit: 10 * 1024,
            //         }
            //       }
            //     ]
            //   },
            {
                test:/\.ts$/,
                use: ['ts-loader'],
                exclude :/node_modules/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ]

}