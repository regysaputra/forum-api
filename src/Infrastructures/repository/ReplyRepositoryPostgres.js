const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ServerError = require('../../Commons/exceptions/ServerError');
const ReplyRepository = require('../../Domains/replies/ReplyRepository');
const AddedReply = require('../../Domains/replies/entities/AddedReply');

class ReplyRepositoryPostgres extends ReplyRepository {
  #pool;

  #idGenerator;

  constructor(pool, idGenerator) {
    super();
    this.#pool = pool;
    this.#idGenerator = idGenerator;
  }

  // @ts-ignore
  async addReply({ content, commentId, userId }) {
    const replyId = `reply-${this.#idGenerator()}`;

    const query = {
      text: 'INSERT INTO replies(reply_id, reply_content, fk_comment_id, fk_user_id) VALUES($1, $2, $3, $4) RETURNING reply_id AS id, reply_content AS content, fk_user_id AS owner',
      values: [replyId, content, commentId, userId],
    };

    let result;

    try {
      result = await this.#pool.query(query);
    } catch (error) {
      throw new ServerError(error.message);
    }

    return new AddedReply({ ...result.rows[0] });
  }

  async findReplyById(replyId) {
    const query = {
      text: 'SELECT * FROM replies WHERE reply_id = $1',
      values: [replyId],
    };

    const result = await this.#pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Reply tidak ditemukan');
    }

    return result.rows[0];
  }

  async getRepliesByCommentId(id) {
    const query = {
      text: 'SELECT * FROM replies LEFT JOIN users ON replies.fk_user_id = users.user_id WHERE fk_comment_id = $1 ORDER BY reply_date ASC',
      values: [id],
    };

    const result = await this.#pool.query(query);

    if (!result.rowCount) {
      return [];
    }

    return result.rows;
  }

  async deleteReply(replyId) {
    const query = {
      text: 'UPDATE replies SET reply_is_delete = true WHERE reply_id = $1',
      values: [replyId],
    };

    await this.#pool.query(query);
  }
}

module.exports = ReplyRepositoryPostgres;
