var restify = require('restify');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'tharles',
    password: '12345678',
    database: 'js_node_crud'
  }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.listen(8087, function () {
  console.log('%s listening at %s', server.name, server.url);
});

// main

server.get('/', function (req, res, next) {

  knex('rest').then((dados) => {
    res.send(dados);
  }, next);

  return next();
});

server.post('/create', function (req, res, next) {

  knex('rest').
    insert(req.body).
    then((dados) => {
      res.send(dados);
    }, next);
});
