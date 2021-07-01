'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('departments', {
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

    await queryInterface.bulkInsert('departments', [
      {
        description: 'Administração',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Almoxarifado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'T.I',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Recepção Convenios',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Recepção Ortopedia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Triagem',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('departments');
  }
};
