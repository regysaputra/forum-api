/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('threads', {
    thread_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    thread_title: {
      type: 'TEXT',
      notNull: true,
    },
    thread_body: {
      type: 'TEXT',
      notNull: true,
    },
    thread_date: {
      type: 'TIMESTAMP',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    fk_user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users',
      onDelete: 'CASCADE',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('threads');
};
