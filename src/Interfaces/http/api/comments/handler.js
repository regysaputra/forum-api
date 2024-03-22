const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');

class CommentsHandler {
  #container;

  constructor(container) {
    this.#container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    const addCommentUseCase = this.#container.getInstance(AddCommentUseCase.name);
    const addedComment = await addCommentUseCase
      .execute(request.payload, request.params.threadId, request.auth.credentials.id);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });

    response.code(201);

    return response;
  }

  async deleteCommentHandler(request) {
    const deleteCommentUseCase = this.#container
      .getInstance(DeleteCommentUseCase.name);

    await deleteCommentUseCase.execute(
      request.params.threadId,
      request.params.commentId,
      request.auth.credentials.id,
    );

    return {
      status: 'success',
    };
  }
}

module.exports = CommentsHandler;
