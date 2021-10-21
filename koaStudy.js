const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// koa特点
// 轻量；
// api: app.use;ctx对象;request,response,req, res的关系；

app.prepare().then(() => {
  const server = new Koa();

  const router = new Router();

  router.get('/test/:id', (ctx) => {
    ctx.body = { success: true };
    ctx.set('Content-type', 'application/json');
  })

  // server.use(async (ctx, next) => {
  //   await handle(ctx.req, ctx.res)
  //   ctx.response = false;
  // })

  server.use(async (ctx, next) => {
    const path = ctx.path;
    const method = ctx.method;
    // ctx.body = `<div>koa render ${method} ${path}</div>`
    await next();
  })

  server.use(router.routes());

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  });
})