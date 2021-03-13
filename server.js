/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const { formatterDate } = require('./src/js/formatterDate');

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
    name: 'Преисполниться в своём познании настолько, что как-будто я уже 100 триллионов миллиардов проживаю',
    status: false,
    created: '11.03.2021 21:36',
  },
];

const fullTickets = [
  {
    id: 1,
    name: 'Посеять хлеб',
    description: 'Посеять хлеб',
    status: true,
    created: '09.03.2021 16:11',
  },
  {
    id: 2,
    name: 'Сделать этот макет',
    description: 'Сделать backend',
    status: false,
    created: '09.03.2021 13:55',
  },
  {
    id: 3,
    name: 'Преисполниться в своём познании настолько, что как-будто я уже 100 триллионов миллиардов проживаю',
    description: 'на триллионах и триллионах такие-же планет, понимаешь, как эта Земля, мне уже этот мир абсолютно понятен',
    status: false,
    created: '11.03.2021 21:36',
  },
];

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use(async (ctx) => {
  const {
    method, shorttext, fulltext, id,
  } = ctx.request.query;

  console.log(ctx.request.query);

  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  });

  switch (method) {
    case 'allTickets':
      ctx.response.body = tickets;
      return;
    case 'createTicket':
      tickets.push({
        id: tickets.length + 1,
        name: shorttext,
        status: false,
        created: formatterDate(),
      });

      fullTickets.push({
        id: tickets.length + 1,
        name: shorttext,
        description: fulltext,
        status: false,
        created: formatterDate(),
      });

      ctx.response.body = tickets[tickets.length - 1];
      return;
    case 'deleteById':
      ctx.response.body = tickets.find((ticket) => ticket.id === +id);
      return;
    case 'ticketById':
      ctx.response.body = fullTickets.find((ticket) => ticket.id === +id);
      return;
    default:
      ctx.response.status = 404;
      return;
  }
});

const port = process.env.PORT || 7070;

const server = http.createServer(app.callback());

server.listen(port);
