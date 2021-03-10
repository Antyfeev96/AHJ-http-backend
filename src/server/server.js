import http from 'http';

const server = http.createServer((req, res) => {
  console.log(req);
  res.end('server response');
});

const port = 7070;

server.listen(port, (err) => {
  if (err) {
    console.log('Error occured: ', err);
    return;
  }

  console.log(`Server is listening on port ${port}`);
});
