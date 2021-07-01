const express = require('express');
const helmet = require("helmet");

const conn = require('./database');
const config = require('./config/config');

const app = express();

app.use(helmet());

//Carregar rotas
const indexRoute = require('./routes/index.route');
const authRoute = require('./routes/authentication.route');
const userRoute = require('./routes/users.route');
const profileRoute = require('./routes/profiles.route');
const roleRoute = require('./routes/roles.route');
const departmentRoute = require('./routes/departments.route');
const printerRoute = require('./routes/printers.route');
const oidRoute = require('./routes/oids.route');
const readingRoute = require('./routes/readingRoutes.route');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.use('/', indexRoute);
app.use('/authenticate', authRoute);
app.use('/users', userRoute);
app.use('/profiles', profileRoute);
app.use('/roles', roleRoute);
app.use('/departments', departmentRoute);
app.use('/printers', printerRoute);
app.use('/oids', oidRoute);

app.use('/readings', readingRoute);

module.exports = app;
