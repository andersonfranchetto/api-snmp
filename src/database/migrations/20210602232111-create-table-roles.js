'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
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
      role: {
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

    await queryInterface.bulkInsert('roles', [
      {
        description: 'Cadastrar novo usuário',
        role: 'user_create',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Atualizar usuário',
        role: 'user_update',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Listar usuários',
        role: 'user_read',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Excluir usuário',
        role: 'user_destroy',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles');
  }
};
