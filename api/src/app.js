const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mainRouter = require('./routes/index');
const passport = require('passport'); //manejo de ingreso x passport
const session = require('express-session'); //manejo de sesion google
const cors = require('cors');
require('./db.js');
require('./middleware/passport.js');
const server = express();

server.name = 'API';
server.use(express.urlencoded({ extended: true }));
//server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
//!CODIGO AUTENTICACION DE GOOGLE
server.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    name: process.env.COOKIE_NAME,
  })
);
server.use(passport.initialize());
server.use(passport.session());
//!CONTINUA EL CIRCUITO
// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.use(mainRouter);

module.exports = server;
