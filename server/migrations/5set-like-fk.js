'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    // field 추가
<<<<<<< HEAD
=======
    // await queryInterface.addColumn('Likes', 'userId', DataTypes.INTEGER);
    // await queryInterface.addColumn('Likes', 'diarieId', DataTypes.INTEGER);
>>>>>>> b2eb2a6 (before getting pair merge)

    // foreign key 연결
    await queryInterface.addConstraint('Likes', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'like-userId',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    // foreign key 연결
    await queryInterface.addConstraint('Likes', {
      fields: ['diarieId'],
      type: 'foreign key',
      name: 'like-diarieId',
      references: {
        table: 'diaries',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeConstraint('Likes', 'userId');
    await queryInterface.removeConstraint('Likes', 'diarieId');
<<<<<<< HEAD
=======
    // await queryInterface.removeColumn('Likes', 'like-userId');
    // await queryInterface.removeColumn('Likes', 'like-diarieId');
>>>>>>> b2eb2a6 (before getting pair merge)
  }
};