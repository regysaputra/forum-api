/* istanbul ignore file */

const pool = require('../src/Infrastructures/database/postgres/pool');

const RepliesTabletestHelper = {
  async addReplies({
    id = 'reply-123',
    content = 'sebuah balasan',
    isDelete = false,
    commentid = 'comment-123',
    userid = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO replies(reply_id, reply_content, reply_is_delete, fk_comment_id, fk_user_id) VALUES($1, $2, $3, $4, $5)',
      values: [id, content, isDelete, commentid, userid],
    };

    await pool.query(query);
  },

  async findReplyById(id) {
    const query = {
      text: 'SELECT * FROM replies WHERE reply_id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM replies WHERE 1=1');
  },
};

module.exports = RepliesTabletestHelper;
