'use strict';

const { Op } = require('sequelize');
const Printer = require('../models/printer');
const Oid = require('../models/oid');
const { getPagingData } = require('../middlewares/pagination');

exports.findAllUnpaginate = async () => {
  return await Printer.findAll({
    include: [
      { association: 'department' },
      { association: 'oids' }
    ]
  });
};
exports.findAll = async (page, limit, offset) => {
  return await Printer.findAndCountAll({
    limit: limit,
    offset: offset,
    include: [
      { association: 'department' },
      { association: 'oids' }
    ],
    col: 'id',
    distinct: true,
  }).then(data => {
    return getPagingData(data, page, limit);
  }).catch(err => {
    return err.message;
  })
};

exports.findByPk = async (id) => {
  return await Printer.findByPk(id, {
    include: [
      { association: 'department' },
      { association: 'oids' }
    ]
  });
};

exports.findOrCreate = async (data) => {
  const [printer, created] = await Printer.findOrCreate({
    where: {
      serial_number: data.serial_number,
    }, defaults: data
  });

  if (created) printer.dataValues.created = true;

  return printer;
};

exports.oids = async (oids, printer) => {
  console.log(oids);
  await printer.removeOids(printer.oids);
  oids.forEach(async oid => {
    const data = await Oid.findByPk(oid.id);
    await printer.addOid(data);
  });
};

exports.update = async (id, data) => {
  return await Printer.update(data, {
    where: {
      id: id
    }
  });
};

exports.destroy = async (id) => {
  await Printer.destroy({
    where: {
      id: id
    }
  });
};
