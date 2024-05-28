const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ServerError = require('../../Commons/exceptions/ServerError');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const AddedThread = require('../../Domains/threads/entities/AddedThread');

class ThreadRepositoryPostgres extends ThreadRepository {
  #pool;

  #idGenerator;

  constructor(pool, idGenerator) {
    super();
    this.#pool = pool;
    this.#idGenerator = idGenerator;
  }

  // @ts-ignore
  async addThread({ title, body, userid }) {
    const threadId = `thread-${this.#idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads(thread_id, thread_title, thread_body, fk_user_id) VALUES($1, $2, $3, $4) RETURNING thread_id AS id, thread_title AS title, fk_user_id AS owner',
      values: [threadId, title, body, userid],
    };

    let result;

    try {
      result = await this.#pool.query(query);
    } catch (error) {
      throw new ServerError(error.message);
    }

    return new AddedThread({ ...result.rows[0] });
  }

  async verifyThreadAvailability(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE thread_id = $1',
      values: [id],
    };

    const result = await this.#pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Thread tidak ditemukan');
    }
  }

  // @ts-ignore
  async getThreadById(id) {
    const query = {
      text: 'SELECT * FROM threads LEFT JOIN users ON threads.fk_user_id = users.user_id WHERE thread_id = $1',
      values: [id],
    };

    const result = await this.#pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Thread tidak ditemukan');
    }

    return result.rows[0];
  }

  async getAllThread() {
    const query = {
      text: 'SELECT * FROM threads LEFT JOIN users ON threads.fk_user_id = users.user_id',
      values: []
    };

    let results;

    try {
      results = await this.#pool.query(query);
    } catch (error) {
      console.log(error);
    }

    return results.rows;
  }
}

module.exports = ThreadRepositoryPostgres;
