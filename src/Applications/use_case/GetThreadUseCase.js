class GetThreadUseCase {
  #threadRepository;

  #commentRepository;

  #replyRepository;

  constructor({ threadRepository, commentRepository, replyRepository }) {
    this.#threadRepository = threadRepository;
    this.#commentRepository = commentRepository;
    this.#replyRepository = replyRepository;
  }

  // eslint-disable-next-line class-methods-use-this
  async #transform(thread, commentArr) {
    const {
      thread_id: threadId,
      thread_title: threadTitle,
      thread_body: threadBody,
      thread_date: threadDate,
      user_username: threadUsername,
    } = thread;

    // eslint-disable-next-line object-curly-newline
    const result = {
      id: threadId,
      title: threadTitle,
      body: threadBody,
      date: threadDate,
      username: threadUsername,
    };

    const comments = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const comment of commentArr) {
      const {
        comment_id: commentId,
        user_username: commentUsername,
        comment_date: commentDate,
        comment_is_delete: commentIsDelete,
      } = comment;

      let { comment_content: commentContent } = comment;

      if (commentIsDelete) {
        commentContent = '**komentar telah dihapus**';
      }

      const commentObj = {
        id: commentId,
        username: commentUsername,
        date: commentDate,
        content: commentContent,
      };

      // eslint-disable-next-line no-await-in-loop
      const replyArr = await this.#replyRepository.getRepliesByCommentId(commentId);
      const replies = [];

      replyArr.forEach((reply) => {
        const {
          reply_id: replyId,
          reply_date: replyDate,
          reply_is_delete: replyIsDelete,
          user_username: replyUsername,
        } = reply;

        let { reply_content: replyContent } = reply;

        if (replyIsDelete) {
          replyContent = '**balasan telah dihapus**';
        }

        const replyObj = {
          id: replyId,
          content: replyContent,
          date: replyDate,
          username: replyUsername,
        };

        replies.push(replyObj);
      });
      commentObj.replies = replies;
      comments.push(commentObj);
    }

    result.comments = comments;
    return result;
  }

  async execute(threadId) {
    const thread = await this.#threadRepository.getThreadById(threadId);
    const comments = await this.#commentRepository.getCommentsByThreadId(threadId);
    return this.#transform(thread, comments);
  }
}

module.exports = GetThreadUseCase;
