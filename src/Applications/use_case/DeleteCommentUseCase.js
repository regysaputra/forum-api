const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class DeleteCommentUseCase {
  #threadRepository;

  #commentRepository;

  constructor({ threadRepository, commentRepository }) {
    this.#threadRepository = threadRepository;
    this.#commentRepository = commentRepository;
  }

  async execute(threadId, commentId, userId) {
    await this.#threadRepository.verifyThreadAvailability(threadId);
    const comment = await this.#commentRepository.findCommentById(commentId);
    if (comment.fk_user_id !== userId) {
      throw new AuthorizationError('Unauthorize user');
    }
    await this.#commentRepository.deleteComment(commentId);
  }
}

module.exports = DeleteCommentUseCase;
