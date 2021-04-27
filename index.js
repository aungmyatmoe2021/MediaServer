let http = require('http');
let url = require('url');
let qs = require('querystring');
require('dotenv').config();

let responsor = (consoleResult, req, res, params) => {
  console.log(consoleResult);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(params);
};

let checkURL = {
  GET: {
    '/': (req, res, params) =>
      responsor(
        'There is get home method running',
        req,
        res,
        `<h1>GET HOME METHOD RUNNING ${
          params.query.name === undefined ? '' : params.query.name
        }</h1>`
      ),
    '/about': (req, res, params) =>
      responsor(
        'There is get about method running',
        req,
        res,
        `<h1>GET ABOUT HOME METHOD RUNNING ${
          params.query.name === undefined ? '' : params.query.name
        }</h1>`
      ),
  },
  POST: {
    '/': (req, res, params) =>
      responsor(
        'There is post home method running',
        req,
        res,
        `<h1>POST HOME METHOD RUNNING ${
          params.query.name === undefined ? '' : params.query.name
        }</h1>`
      ),
    '/about': (req, res, params) =>
      responsor(
        'There is post about method running',
        req,
        res,
        `<h1>POST ABOUT METHOD RUNNING ${
          params.query.name === undefined ? '' : params.query.name
        }</h1>`
      ),
    '/api/login': (req, res) => {
      let body = '';
      req.on('data', data => {
        body += data;
        if (body.length > 1024) {
          res.writeHead(403, { 'Content-Type': 'text/html' });
          res.end('<h1>File Size is too big</h1>');
        }
      });
      req.on('end', () => {
        let query = qs.parse(body);
        responsor(
          `Email is ${query.email} and Password is ${query.password}`,
          req,
          res,
          `<h1>Email is ${query.email} and Password is ${query.password}</h1>`
        );
        res.end();
      });
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
