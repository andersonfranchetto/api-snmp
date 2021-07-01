'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('printers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      serial_number: { //cpf ou cnpj
        type: Sequelize.STRING,
        allowNull: false
      },
      model: { //resposavel direto
        type: Sequelize.STRING,
        allowNull: false
      },
      ip_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mac_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      scanner: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      drum: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      mono: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'departments', key: 'id' },
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
    await queryInterface.bulkInsert('printers', [
      {
        serial_number: 'AK93014487',
        model: 'ES4172LP MFP',
        ip_address: '192.168.200.90',
        mac_address: '',
        scanner: true,
        drum: true,
        mono: true,
        department_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serial_number: 'AK97017087',
        model: 'ES4172LP MFP',
        ip_address: '192.168.10.95',
        mac_address: '',
        scanner: true,
        drum: true,
        mono: true,
        department_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('printers');
  }
};
