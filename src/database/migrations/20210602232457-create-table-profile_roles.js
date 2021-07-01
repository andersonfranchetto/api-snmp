'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profile_roles', {
      profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'profiles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' },
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

    await queryInterface.bulkInsert('profile_roles', [
      {
        profile_id: 1,
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile_id: 1,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile_id: 1,
        role_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile_id: 1,
        role_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profile_roles');
  }
};
