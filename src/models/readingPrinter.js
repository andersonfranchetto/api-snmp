'use strict';

const { Model, DataTypes } = require('sequelize');

class ReadingPrinter extends Model {
  static init(sequelize) {
    super.init({
      mono: DataTypes.INTEGER,
      scan: DataTypes.INTEGER,
      color: DataTypes.INTEGER,
      drum_life: DataTypes.INTEGER,
      readingDate: DataTypes.DATEONLY
    }, {
      sequelize,
      tableName: 'reading_printer'
    })
  }

  static associate(models) {
    this.belongsTo(models.Printer, { foreignKey: 'printer_id', as: 'printer' })
  }
};

module.exports = ReadingPrinter;
