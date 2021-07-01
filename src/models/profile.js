'use strict';

const { Model, DataTypes } = require('sequelize');

class Profile extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'profiles',
      name: {
          singular: 'profile',
          plural: 'profiles'
      }
    })
  }

  static associate(models) {
    this.belongsToMany(models.Role, { foreignKey: 'profile_id', through: 'profile_roles', as: 'roles' }),
    this.hasMany(models.User, { foreignKey: 'profile_id', as: 'users' })
  }
};

module.exports = Profile;
