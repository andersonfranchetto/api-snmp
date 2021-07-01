'use strict'

const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

//Carregar Models
const User = require('../models/user');
const Profile = require('../models/profile');
const Role = require('../models/role');
const Printer = require('../models/printer');
const ReadingPrinter = require('../models/readingPrinter');
const Department = require('../models/department');
const Oid = require('../models/oid');

const connection = new Sequelize(dbConfig);

User.init(connection);
Profile.init(connection);
Role.init(connection);
Printer.init(connection);
ReadingPrinter.init(connection);
Department.init(connection);
Oid.init(connection);

User.associate(connection.models);
Profile.associate(connection.models);
Role.associate(connection.models);
Printer.associate(connection.models);
ReadingPrinter.associate(connection.models);
Department.associate(connection.models);
Oid.associate(connection.models);

module.exports = connection;
