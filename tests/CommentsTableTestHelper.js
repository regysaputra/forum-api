/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-123',
    content = 'sebuah komentar',
    isDelete = false,
    threadid = 'thread-123',
    userid = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO comments(comment_id, comment_content, comment_is_delete, fk_thread_id, fk_user_id) VALUES($1, $2, $3, $4, $5)',
      values: [id, content, isDelete, threadid, userid],
    };

    await pool.query(query);
  },

  async findCommentById(id) {
    const query = {
      text: 'SELECT * FROM comments WHERE comment_id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1=1');
  },
};

module.exports = CommentsTableTestHelper;
