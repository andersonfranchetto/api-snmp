'use strict';

const { Model, DataTypes } = require('sequelize');

class Printer extends Model {
  static init(sequelize) {
    super.init({
      serial_number: DataTypes.STRING,
      model: DataTypes.STRING,
      ip_address: DataTypes.STRING,
      mac_address: DataTypes.STRING,
      scanner: DataTypes.BOOLEAN,
      drum: DataTypes.BOOLEAN,
      mono: DataTypes.BOOLEAN
    }, {
      sequelize,
      tableName: 'printers',
      name: {
          singular: 'printer',
          plural: 'printers'
      }
    })
  }

  static associate(models) {
    this.belongsToMany(models.Oid, { foreignKey: 'printer_id', through: 'oids_printer', as: 'oids' })
    this.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department' })
    this.hasMany(models.ReadingPrinter, { foreignKey: 'printer_id', as: 'reading' })
  }
};

module.exports = Printer;
