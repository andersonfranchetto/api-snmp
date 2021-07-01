'use strict';

const Oid = require('../models/oid');
const { getPagingData } = require('../middlewares/pagination');

exports.findAll = async (page, limit, offset) => {
  return await Oid.findAndCountAll({
    limit: limit,
    offset: offset,
    col: 'id',
    distinct: true,
  }).then(data => {
    return getPagingData(data, page, limit);
  }).catch(err => {
    return err.message;
  })
};

exports.findByPk = async (id) => {
  return await Oid.findByPk(id);
};

exports.findOrCreate = async (data) => {
  const [oid, created] = await Oid.findOrCreate({
    where: {
      description: data.description,
    }, defaults: data
  });

  if (created) oid.dataValues.created = true;

  return oid;
};

exports.update = async (id, data) => {
  return await Oid.update(data, {
    where: {
      id: id
    }
  });
};

exports.destroy = async (id) => {
  await Oid.destroy({
    where: {
      id: id
    }
  });
};
