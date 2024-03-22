const AddReply = require('../../Domains/replies/entities/AddReply');

class AddReplyUseCase {
  #threadRepository;

  #commentRepository;

  #replyRepository;

  constructor({ threadRepository, commentRepository, replyRepository }) {
    this.#threadRepository = threadRepository;
    this.#commentRepository = commentRepository;
    this.#replyRepository = replyRepository;
  }

  async execute (useCasePayload, threadId, commentId, userId) {
    const addReply = new AddReply(useCasePayload, commentId, userId);

    await this.#threadRepository.verifyThreadAvailability(threadId);
    await this.#commentRepository.verifyCommentAvailability(commentId);

    return this.#replyRepository.addReply(addReply);
  }
}

module.exports = AddReplyUseCase;
