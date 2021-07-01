'use strict';

const { Model, DataTypes } = require('sequelize');

class Oid extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.STRING,
      oid_code: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'oids',
      name: {
          singular: 'oid',
          plural: 'oids'
      }
    })
  }

  static associate(models) {
    this.belongsToMany(models.Printer, { foreignKey: 'oid_id', through: 'oids_printer', as: 'printers' })
  }
};

module.exports = Oid;
