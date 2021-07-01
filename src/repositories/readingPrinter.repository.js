'use strict';

const ReadingPrinter = require('../models/readingPrinter');
const { getPagingData } = require('../middlewares/pagination');
const { Op } = require("sequelize");

exports.findAll = async (page, limit, offset) => {
  return await ReadingPrinter.findAndCountAll({
    limit: limit,
    offset: offset,
    col: 'id',
    attributes: ['id', 'mono', 'color', 'scan', 'drum_life', 'readingDate'],
    include: [{
      association: 'printer', attributes: ['ip_address', 'model', 'scanner', 'mono', 'drum'],
      include: { association: 'department', attributes: ['id', 'description'] },
    }],
    distinct: true,
    order: [
      ['readingDate', 'DESC']
    ],
  }).then(data => {
    return getPagingData(data, page, limit);
  }).catch(err => {
    return err.message;
  })
};

exports.findByPk = async (id) => {
  return await ReadingPrinter.findByPk(id, {
    attributes: ['id', 'mono', 'color', 'scan', 'drum_life'],
    include: [{
      association: 'printer', attributes: ['ip_address', 'model', 'scanner', 'mono', 'drum'],
      include: { association: 'department', attributes: ['id', 'description'] },
    }],
  });
};

exports.findOrCreate = async (data) => {
  const [readingPrinter, created] = await ReadingPrinter.findOrCreate({
    where: {
      [Op.and]: {
        readingDate: Date.now(),
        printer_id: data.printer_id
      }
    }, defaults: data
  });

  if (created) readingPrinter.dataValues.created = true;

  return readingPrinter;
};

exports.update = async (id, data) => {
  return await ReadingPrinter.update(data, {
    where: {
      id: id
    }
  });
};

exports.destroy = async (id) => {
  await ReadingPrinter.destroy({
    where: {
      id: id
    }
  });
};
