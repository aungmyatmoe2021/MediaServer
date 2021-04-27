let http = require('http');
let url = require('url');
require('dotenv').config();

let checkURL = {
  GET: {
    '/': (req, res, params) => {
      console.log('There is get home method running');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(
        `<h1>GET HOME METHOD RUNNING ${
          params.query.name === undefined ? '' : params.query.name
        }</h1>`
      );
    },
    '/about': (req, res, params) => {
      console.log('There is get about method running');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(
        `<h1>GET ABOUT HOME METHOD RUNNING ${
          params.query.name === undefined ? '' : params.query.name
        }</h1>`
      );
    },
  },
  POST: {
    '/': (req, res, params) => {
      console.log('There is post home method running');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(
        `<h1>POST HOME METHOD RUNNING ${
          params.query.name === undefined ? '' : params.query.name
        }</h1>`
      );
    },
    '/about': (req, res, params) => {
      console.log('There is post about method running');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(
        `<h1>POST ABOUT METHOD RUNNING ${
          params.query.name === undefined ? '' : params.query.name
        }</h1>`
      );
    },
  },
  NA: (req, res, params) => {
    console.log('No Page');
    res.writeHead(404);
    res.end('<h1>No Page for that route!</h1>');
  },
};

let startServer = (req, res) => {
  let method = req.method;
  let params = url.parse(req.url, true);
  let resolveRoute = checkURL[method][params.pathname];
  if (resolveRoute != null && resolveRoute != undefined) {
    resolveRoute(req, res, params);
  } else {
    checkURL['NA'](req, res, params);
  }
};

let server = http.createServer(startServer);

server.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
