/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('replies', {
    reply_id: {
      type: 'VARCHAR(50)',
      primaryKey: 50,
    },
    reply_content: {
      type: 'TEXT',
      notNull: true,
    },
    reply_date: {
      type: 'TIMESTAMP',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    reply_is_delete: {
      type: 'BOOL',
      default: false,
    },
    fk_comment_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'comments',
      onDelete: 'CASCADE',
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
  pgm.dropTable('replies');
};
