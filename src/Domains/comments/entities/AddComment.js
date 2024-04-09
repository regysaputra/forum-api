class AddComment {
  constructor(payload, threadid, userid) {
    if (payload === null) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    this.#verifyPayload(payload);
    const { content } = payload;

    this.content = content;
    this.threadid = threadid;
    this.userid = userid;
  }

  // eslint-disable-next-line class-methods-use-this
  #verifyPayload({ content }) {
    if (!content) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddComment;
