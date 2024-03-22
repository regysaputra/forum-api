/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-123',
    title = 'sebuah thread',
    body = 'sebuah body thread',
    userid = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO threads(thread_id, thread_title, thread_body, fk_user_id) VALUES($1, $2, $3, $4)',
      values: [id, title, body, userid],
    };

    await pool.query(query);
  },

  async verifyThreadAvailability(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE thread_id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
  },
};

module.exports = ThreadsTableTestHelper;
