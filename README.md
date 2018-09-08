## react单页面
### 技术栈
+ react dva node webpack react-router-redux react-cropper react-masonry-component
### 项目描述
+ 页面为响应式页面，主要实现了图片的裁切，上传，和瀑布流展示
+ 后端通过node实现。
### 项目细节
+ 图片同步显示通过操作File对象实现，代替以往的iframe上传。通过FileReader，读取File内容（base64)。
+ Formdata对象将数据编译为键值对，之后通过XMLHttpRequest上传。通过onprogress监测上传进度。
+ 图片裁切通过react-cropper实现。裁切完后将File对象转换为Blob对象。
+ 响应式布局通过百分比和媒体布局实现。为适应

![](https://github.com/LKCCY/reactpro-one/blob/master/images/m1.gif)

![](https://github.com/LKCCY/reactpro-one/blob/master/images/m2.gif)
