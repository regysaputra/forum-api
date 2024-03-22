/* eslint-disable max-len */
const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase');
const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyUseCase');

class RepliesHandler {
  #container;

  constructor(container) {
    this.#container = container;

    this.postReplyHandler = this.postReplyHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
  }

  async postReplyHandler(request, h) {
    const addReplyUseCase = this.#container.getInstance(AddReplyUseCase.name);
    const addedReply = await addReplyUseCase
      .execute(request.payload, request.params.threadId, request.params.commentId, request.auth.credentials.id);

    const response = h.response({
      status: 'success',
      data: {
        addedReply,
      },
    });

    response.code(201);

    return response;
  }

  async deleteReplyHandler(request) {
    const deleteReplyUseCase = this.#container.getInstance(DeleteReplyUseCase.name);

    await deleteReplyUseCase.execute(
      request.params.threadId,
      request.params.commentId,
      request.params.replyId,
      request.auth.credentials.id,
    );

    return {
      status: 'success',
    };
  }
}

module.exports = RepliesHandler;
