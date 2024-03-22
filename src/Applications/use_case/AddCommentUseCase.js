const AddComment = require('../../Domains/comments/entities/AddComment');

class AddCommentUseCase {
  #threadRepository;

  #commentRepository;

  constructor({ threadRepository, commentRepository }) {
    this.#threadRepository = threadRepository;
    this.#commentRepository = commentRepository;
  }

  async execute(useCasePayload, threadid, userid) {
    const addComment = new AddComment(useCasePayload, threadid, userid);
    await this.#threadRepository.verifyThreadAvailability(addComment.threadid);
    return this.#commentRepository.addComment(addComment);
  }
}

module.exports = AddCommentUseCase;
