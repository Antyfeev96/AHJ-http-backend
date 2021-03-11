/* eslint-disable no-unused-vars */
const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use(async (ctx) => {
  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
  });

  console.log(ctx.request.querystring);

  ctx.response.body = ctx.request.querystring;
});

const port = process.env.PORT || 7070;

const server = http.createServer(app.callback());

server.listen(port);
