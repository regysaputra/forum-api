const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ServerError = require('../../Commons/exceptions/ServerError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const AddedComment = require('../../Domains/comments/entities/AddedComment');

class CommentRepositoryPostgres extends CommentRepository {
  #pool;

  #idGenerator;

  constructor(pool, idGenerator) {
    super();
    this.#pool = pool;
    this.#idGenerator = idGenerator;
  }

  // @ts-ignore
  async addComment({ content, threadid, userid }) {
    const commentId = `comment-${this.#idGenerator()}`;

    const query = {
      text: 'INSERT INTO comments(comment_id, comment_content, fk_thread_id, fk_user_id) VALUES($1, $2, $3, $4) RETURNING comment_id AS id, comment_content AS content, fk_user_id as owner',
      values: [commentId, content, threadid, userid],
    };

    let result;

    try {
      result = await this.#pool.query(query);
    } catch (error) {
      throw new ServerError(error.message);
    }

    return new AddedComment({ ...result.rows[0] });
  }

  async verifyCommentAvailability(commentId) {
    const query = {
      text: 'SELECT * FROM comments WHERE comment_id = $1 AND comment_is_delete = false',
      values: [commentId],
    };

    const result = await this.#pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Komentar tidak ditemukan');
    }
  }

  // @ts-ignore
  async findCommentById(commentId) {
    const query = {
      text: 'SELECT * FROM comments WHERE comment_id = $1 AND comment_is_delete = false',
      values: [commentId],
    };

    const result = await this.#pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Komentar tidak ditemukan');
    }

    return result.rows[0];
  }

  async getCommentsByThreadId(id) {
    const query = {
      text: 'SELECT * FROM comments LEFT JOIN users ON comments.fk_user_id = users.user_id WHERE comments.fk_thread_id = $1 ORDER BY comment_date ASC',
      values: [id],
    };

    const result = await this.#pool.query(query);
    if (!result.rowCount) {
      return [];
    }

    return result.rows;
  }

  async deleteComment(id) {
    const query = {
      text: 'UPDATE comments SET comment_is_delete = true WHERE comment_id = $1',
      values: [id],
    };

    await this.#pool.query(query);
  }
}

module.exports = CommentRepositoryPostgres;
