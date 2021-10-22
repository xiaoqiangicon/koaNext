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