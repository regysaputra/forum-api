class AddThread {
  constructor(payload, userid) {
    if (payload === null) {
      throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    this.#verifyPayload(payload);

    const { title, body } = payload;

    this.title = title;
    this.body = body;
    this.userid = userid;
  }

  // eslint-disable-next-line class-methods-use-this
  #verifyPayload({ title, body }) {
    if (!title || !body) {
      throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof body !== 'string') {
      throw new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddThread;
