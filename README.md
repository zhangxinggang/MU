
## MU
> MU 多页面UI，也可以意为my ui
## 使用

demo运用地址：https://github.com/zhangxinggang/LocalMusicPlayer.git

1、git clone https://github.com/zhangxinggang/MU.git

2、在同级目录新建一个项目（也可以在其他地方新建你的项目），将MU文件里面的pakage.json的依赖复制到你的项目

3、入口文件内容如下(例如为index.js)，路径根据实际情况而定

```js
const config = require("../config")
const mu = require('../../MU')
module.exports = (env, arg) =>{
	return mu({...config},arg)
}

```
4、

> npm install

5、
```
webpack-dev-server  --NODE_ENV development --devtool inline-source-map --hot --config ./index.js
```


## config文件内容

```js
const path = require('path')
module.exports = {
	services:{
		viewServer:{
			output:path.resolve(process.cwd(),'dist'),
			entry:path.resolve(process.cwd(),"./src/page")
		}
	}
}
```
MU重新定义了entry，为一个路径，框架自动从这个路径下所有文件夹里，查找index.js入口文件，其他参数都和webpack参数设置一致，如果项目不定义config文件，entry默认为程序运行目录的src/page页面，output默认为程序运行目录的dist文件夹