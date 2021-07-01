'use strict';

const { Model, DataTypes } = require('sequelize');

class Department extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'departments',
      name: {
          singular: 'department',
          plural: 'departments'
      }
    })
  }

  static associate(models) {
    this.hasMany(models.Printer, { foreignKey: 'department_id', as: 'printers' })
  }
};

module.exports = Department;
