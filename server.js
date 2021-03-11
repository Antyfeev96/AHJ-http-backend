/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

const ticket1 = {
  id: 1,
  name: 'ticket1',
  status: false,
  created: '11.03.2021 21:36',
};

const ticket2 = {
  id: 2,
  name: 'ticket2',
  status: false,
  created: '11.03.2021 21:36',
};

const ticket3 = {
  id: 3,
  name: 'ticket3',
  status: true,
  created: '11.03.2021 21:36',
};

const tickets = [ticket1, ticket2, ticket3];

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use(async (ctx) => {
  const { method } = ctx.request.query;
  console.log();

  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
  });

  console.log(ctx.request.query);

  console.log(method);

  switch (method) {
    case 'allTickets':
      ctx.response.body = tickets;
      return;
    // TODO: обработка остальных методов
    default:
      ctx.response.status = 404;
      return;
  }
});

const port = process.env.PORT || 7070;

const server = http.createServer(app.callback());

server.listen(port);
