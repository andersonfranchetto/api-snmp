'use strict';

const Profile = require('../models/profile');
const Role = require('../models/role');
const { getPagingData } = require('../middlewares/pagination');

exports.findAll = async (page, limit, offset) => {
  return await Profile.findAndCountAll({
    limit: limit,
    offset: offset,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      association: 'roles',
      attributes: ['description', 'role'],
      through: { attributes: [] }
    },
    col: 'id',
    distinct: true,
  }).then(data => {
    return getPagingData(data, page, limit);
  }).catch(err => {
    return err.message;
  })
};

exports.findByPk = async (id) => {
  return await Profile.findByPk(id, {
    include: { association: 'roles', through: { attributes: [] } }
  });
};

exports.findOrCreate = async (data) => {
  const [profile, created] = await Profile.findOrCreate({
    where: {
      name: data.name,
      email: data.email,
    }, defaults: data
  });

  if (created) profile.dataValues.created = true;

  return profile;
};

exports.roles = async (roles, profile) => {
  await profile.removeRoles(profile.roles);
  roles.forEach(async role => {
    const data = await Role.findByPk(role.id);
    await profile.addRole(data);
  });
};

exports.update = async (id, data) => {
  return await Profile.update(data, {
    where: {
      id: id
    }
  });
};

exports.destroy = async (id) => {
  await Profile.destroy({
    where: {
      id: id
    }
  });
};
