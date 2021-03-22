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

const tickets = [];

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
        description: fulltext,
        status: false,
        created: formatterDate(),
      });

      ctx.response.body = tickets[tickets.length - 1];
      return;
    case 'editTicket':
      tickets.find((ticket) => ticket.id === +id).name = shorttext;
      tickets.find((ticket) => ticket.id === +id).description = fulltext;
      ctx.response.body = tickets.find((ticket) => ticket.id === +id);
      return;
    case 'deleteById':
      tickets.splice(tickets.findIndex((ticket) => ticket.id === +id), 1);
      ctx.response.body = tickets;
      return;
    case 'ticketById':
      ctx.response.body = tickets.find((ticket) => ticket.id === +id);
      return;
    default:
      ctx.response.status = 404;
      return;
  }
});

const port = process.env.PORT || 7070;

const server = http.createServer(app.callback());

server.listen(port);
