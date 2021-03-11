const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use(async (ctx) => {
  // const { name, age } = ctx.request;

  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
  });

  console.log(ctx.response.body);
  ctx.response.body = ctx.request.query;
});

const port = process.env.PORT || 7070;

const server = http.createServer(app.callback()).listen(port);
