'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('oids_printer', {
      printer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'printers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      oid_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'oids', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

    await queryInterface.bulkInsert('oids_printer', [
      {
        printer_id: 1,
        oid_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        printer_id: 1,
        oid_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        printer_id: 1,
        oid_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        printer_id: 1,
        oid_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        printer_id: 1,
        oid_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oids_printer');
  }
};
