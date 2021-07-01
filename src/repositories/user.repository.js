'use strict';

const md5 = require('md5');
const User = require('../models/user');
const { getPagingData } = require('../middlewares/pagination');

exports.findAll = async (page, limit, offset) => {
  return await User.findAndCountAll({
    limit: limit,
    offset: offset,
    include: { association: 'profile' },
    col: 'id',
    distinct: true,
  }).then(data => {
    return getPagingData(data, page, limit);
  }).catch(err => {
    return err.message;
  })
};

exports.findByPk = async (id) => {
  return await User.findByPk(id, {
    include: { association: 'profile' }
  });
};

exports.authenticate = async (email, password) => {
  return await User.findOne({
    where: {
      email: email,
      password: md5(password + global.SALT_KEY)
    }
  });
}

exports.findByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email
    }
  })
}

exports.findOrCreate = async (data) => {
  const [user, created] = await User.findOrCreate({
    where: {
      email: data.email
    }, defaults: {
      name: data.name,
      email: data.email,
      password: md5(data.password + global.SALT_KEY),
      profile_id: data.profile_id
    }
  });

  if (created) user.dataValues.created = true;

  return user;
};

exports.update = async (id, data) => {
  data.password = md5(data.password);
  await User.update(data, {
    where: {
      id: id
    }
  });
};

exports.destroy = async (id) => {
  await User.destroy({
    where: {
      id: id
    }
  });
};
