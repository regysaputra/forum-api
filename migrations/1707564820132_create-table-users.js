/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    user_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_username: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    user_password: {
      type: 'TEXT',
      notNull: true,
    },
    user_fullname: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
