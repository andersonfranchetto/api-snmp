'use strict';

const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        required: true
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'users',
      name: {
          singular: 'user',
          plural: 'users'
      }
    })
  }

  static associate(models) {
    this.belongsTo(models.Profile, { foreignKey: 'profile_id', as: 'profile' });
  }
};

module.exports = User;
