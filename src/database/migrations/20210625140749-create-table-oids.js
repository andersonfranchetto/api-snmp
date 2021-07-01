'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('oids', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      oid_code: {
        type: Sequelize.STRING,
        allowNull: false,
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

    await queryInterface.bulkInsert('oids', [
      {
        description: 'Printer Name',
        oid_code: '1.3.6.1.4.1.2001.1.2.1.1.4000.20.0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Printed Pages Mono',
        oid_code: '1.3.6.1.4.1.2001.1.1.1.1.11.1.10.130.0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Remaining Black',
        oid_code: '1.3.6.1.2.1.43.11.1.1.9.1.1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Remaining Cyan',
        oid_code: '1.3.6.1.2.1.43.11.1.1.9.1.2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Remaining Magenta',
        oid_code: '1.3.6.1.2.1.43.11.1.1.9.1.3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Remaining Yellow',
        oid_code: '1.3.6.1.2.1.43.11.1.1.9.1.4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Serial Number',
        oid_code: '1.3.6.1.4.1.2001.1.1.1.1.11.1.10.45.0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Model Printer',
        oid_code: '1.3.6.1.4.1.2699.1.2.1.2.1.1.2.1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Printed Pages Color',
        oid_code: '1.3.6.1.4.1.2001.1.1.1.1.11.1.10.140.0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oids');
  }
};
