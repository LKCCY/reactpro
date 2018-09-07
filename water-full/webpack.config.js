const path = require("path")
module.exports = {
	entry:"./src/main.js",
	output:{
		filename:"bundle.js",
		publicPath:"xuni"
	},
	mode:"development",
	module:{
		rules:[
			{
				test:/\.js$/,
				include:[path.resolve(__dirname,"./src")],
				exclude:[path.resolve(__dirname,"node_modules")],
				loader:"babel-loader",
				options:{
					presets:["env","react"],
					plugins:["transform-object-rest-spread","transform-runtime"]
				}
			},
			{
	            test: /\.less$/,
	            include:[path.resolve(__dirname,"./src")],
				exclude:[path.resolve(__dirname,"node_modules")],
	            use: [{
	                loader: "style-loader"
	            }, {
	                loader: "css-loader"
	            }, {
	                loader: "less-loader", options: {
	                    strictMath: true,
	                    noIeCompat: true
	                }
	            }]
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
				  {
					loader: 'url-loader',
					options: {
					  limit: 8192
					}
				  }
				]
			  }
		]
	},
	devServer:{
		proxy:{
			"/api":{
				target:"http://127.0.0.1:3000",
				// 如果存在跨域，配上changeOrigin: true
				changeOrigin: true,
				pathRewrite: {'^/api' : ''}
			}
		}
	}
}

