'use strict';

const Role = require('../models/role');
const { getPagingData } = require('../middlewares/pagination');

exports.findAll = async (page, limit, offset) => {
  return await Role.findAndCountAll({
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
  return await Role.findByPk(id);
};
exports.findOrCreate = async (data) => {
  const [role, created] = await Role.findOrCreate({
    where: {
      role: data.role
    }, defaults: data
  });

  if (created) role.dataValues.created = true;

  return role;
};

exports.update = async (id, data) => {
  return await Role.update(data, {
    where: {
      id: id
    }
  });
};

exports.destroy = async (id) => {
  return await Role.destroy({
    where: {
      id: id
    }
  });
};
