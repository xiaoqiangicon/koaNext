# koaNext
koa + next


## pages下面对应每一个路由页面（最主要的功能） _app.js例外
## lib 一般存放非组件类的公用代码
## static 静态文件；css,img,js之类的
## .next  生成一些配置文件；启动后编译的；next是基于webpack的

### 路由跳转Link组件；前端跳转; 需要指定渲染内容,本身不渲染内容；传入的必须是唯一节点；

### Router模块手动跳转;只能通过query带动态参数
### 路由映射，第二个参数;有一个问题就是刷新会404，服务端没有这个路径渲染；所以需要koa解决这个问题
### router的钩子，routerChangeStart,routerChangeComplete;routerChangeError, beforeHistoryChange,hashChangeStart,hashChangeComplete;

### getInitialProps 1.在页面中获取数据  2.在APP中获取全局数据(客服端和服务端数据之间的同步) 
### nextjs的数据获取规范；应该尽量把数据获取相关的放到这个方法里面；
### 只有在page下面的getInitialProps会被调用，其他文件夹下的不会调用；在服务端和客户端渲染都会有；

### 自定义app.js
### 1.固定Layout; 2.保持一些公用的状态 3.给页面传入一些自定义数据；4.自定义错误处理；


### 自定义document
### 1.只有在服务端渲染的时候才会被调用  2.用来修改服务端渲染的文档内容   3.一般用来配合第三方css-in-js方案使用


### ssr流程
### 1.浏览器发起page请求，2.koa接收到请求，来调用nextjs；3.nextjs开始渲染； 4.调用app的getInitialProps; 5.调用页面的getInitialProps; 6.渲染出最终html；7.返回给浏览器；

### 客户端渲染
### 1.点击链接按钮；2.异步加载页面的组件js；3.调用页面的getInitialProps;4.数据返回，路由变化；


### oAUTH授权和认证
### 主要看oauth提供方
### refresh Token;  Authentication code;  Device code


### 服务端如何写入数据到store;
### 如何同步服务端的数据到客户端;



