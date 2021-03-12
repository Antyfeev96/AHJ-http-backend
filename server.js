/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

const tickets = [
  {
    id: 1,
    name: 'Посеять хлеб',
    status: true,
    created: '09.03.2021 16:11',
  },
  {
    id: 2,
    name: 'Сделать этот макет',
    status: false,
    created: '09.03.2021 13:55',
  },
  {
    id: 3,
    name: 'Преисполниться в своём познании настолько, что как-будто я уже 100 триллионов миллиардов лет тут живу',
    status: false,
    created: '11.03.2021 21:36',
  },
];

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use(async (ctx) => {
  const { method, id } = ctx.request.query;
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
    case 'createTicket':
      ctx.response.body = 'Task created';
      return;
    default:
      ctx.response.status = 404;
      return;
  }
});

const port = process.env.PORT || 7070;

const server = http.createServer(app.callback());

server.listen(port);
