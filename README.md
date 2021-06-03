# Tool-api

>  Tool-api 是一个node开发的工具类api，因为node具有高并发的优点，所以在工作中，我们可以把工具类的api都独立出来用node去开发，提升效率。



# 项目安装

##### 1.下载源码

```js
https://github.com/xujian0921/Tool-api.git
```

##### 2.安装依赖

```js
npm install    //安装失败的话可以切换到淘宝源  cnpm install 或者 yarn
```

##### 3.启动项目

```js
npm run start
```



# 项目说明

由于JavaScript单线程的原因，刚开始用node做工具类的api的时候，经常由于代码某个环节崩溃，导致整个系统都崩溃，k8s进程开始重启。这样api的用起来体验感就很差。所以我们用node做api的时候，一定要做好错误捕获，尽量避免未知的错误。遇到底层的意外错误无法捕获，也要及时处理，杀死进程，重新启动。做好健康检测，一旦出现异常，及时发现，及时解决。



# 功能展示

### 功能一：

api输入PDF文件地址，进行PDF文件内容识别，返回所需要的信息。

![H5](https://opensource-photo.oss-cn-shanghai.aliyuncs.com/Tool-api/nodepdf.jpg)

![H5](https://opensource-photo.oss-cn-shanghai.aliyuncs.com/Tool-api/pdf.jpg)

接口输入pdf的地址，识别成功返回sucess: true 和 tracking No 对应的数据。 失败则返回success: false 和 错误的message



## ★Star

如果你有好的意见或建议，欢迎给我们提 [issue](https://github.com/xujian0921/Tool-api/issues) 

如果你觉得此项目对你有帮助的话，请点亮最上方的star,谢谢啦。-.-

 ##### 路漫漫其修远兮，吾将上下而求索 