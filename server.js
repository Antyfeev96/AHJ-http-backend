const http = require('http');
const Koa = require('koa');

const app = new Koa();
app.use(async (ctx) => {
  // const { name, age } = ctx.request;

  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
  });

  console.log(ctx.request.query);
  ctx.response.body = ctx.request.query;
  console.log(123);
});

const port = 7070;

const server = http.createServer(app.callback());
server.listen(port);
