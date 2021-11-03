const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');
const session = require('koa-session');
const Redis = require('ioredis');
const auth = require('./server/auth');

const RedisSessionStore = require('./server/session-store');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// 创建redis client;
const redis = new Redis();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ['lee secret']  // koa签名；默认
  const SESSION_CONFIG = {  // 设置session相关数据
    key: 'lid',
    store: new RedisSessionStore(redis) // 用来存取内容数据库
  }

  // 告诉koa需要使用session
  server.use(session(SESSION_CONFIG, server))

  // 配置处理github oauth登陆
  auth(server);

  // router.get('/set/user', async ctx => {
  //   ctx.session.user = {
  //     name: 'lee',
  //     age: '18'
  //   }

  //   ctx.body = 'set session success';
  // })

  // router.get('/delete/user', async ctx => {
  //   ctx.session = null
  //   ctx.body = 'delete session success';
  // })

  router.get('/a/:id', async (ctx) => {
    const id = ctx.params.id;

    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: {
        id,
      }
    })
    ctx.respond = false;
  })

  router.get('/api/user/info', async (ctx) => {
    const user = ctx.session.userInfo;
    console.log(ctx.session.userInfo, ctx.session, '这里是ctx');
    if (user) {
      ctx.body = user;
      ctx.set('Content-Type', 'application/json')
    } else {
      ctx.status = 401;
      ctx.body = 'need login';
    }
  })


  // 使用Nextjs操作后续处理
  server.use(router.routes());
  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', 'cookie', {
    //   httpOnly: false,
    // })

    await handle(ctx.req, ctx.res)
    ctx.response = false;
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  });
})