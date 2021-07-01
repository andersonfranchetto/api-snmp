'use strict';

const Department = require('../models/department');
const { getPagingData } = require('../middlewares/pagination');

exports.findAll = async (page, limit, offset) => {
  return await Department.findAndCountAll({
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
  return await Department.findByPk(id);
};

exports.findOrCreate = async (data) => {
  const [department, created] = await Department.findOrCreate({
    where: {
      description: data.description,
    }, defaults: data
  });

  if (created) department.dataValues.created = true;

  return department;
};

exports.update = async (id, data) => {
  return await Department.update(data, {
    where: {
      id: id
    }
  });
};

exports.destroy = async (id) => {
  await Department.destroy({
    where: {
      id: id
    }
  });
};
