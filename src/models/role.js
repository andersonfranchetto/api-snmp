'use strict';

const { Model, DataTypes } = require('sequelize');

class Role extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.STRING,
      role: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'roles',
      name: {
          singular: 'role',
          plural: 'roles'
      }
    })
  }

  static associate(models) {
    this.belongsToMany(models.Profile, { foreignKey: 'role_id', through: 'profile_roles', as: 'profiles' })
  }
};

module.exports = Role;
