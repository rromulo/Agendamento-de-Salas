'use strict';

const { randomUUID } = require('crypto');
const md5 = require('md5');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: randomUUID(),
          name: 'Administrador',
          email: 'admin@sistema.com',
          password: md5('admin123'),
          role: 'ADMIN',
          is_active: true,
          can_scheduling: true,
          can_view_logs: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', { email: 'admin@sistema.com' }, {});
  },
};
