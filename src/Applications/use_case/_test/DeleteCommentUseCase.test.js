const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should throw AuthorizationError when user not belong to the comment', async () => {
    // Arrange
    const comment = {
      comment_id: 'comment-123',
      comment_content: 'comment',
      comment_date: '2024-03-12T14:25:10',
      comment_is_delete: false,
      fk_thread_id: 'thread-123',
      fk_user_id: 'user-123',
    };

    /** Create dependencies of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadAvailability = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.findCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve(comment));

    /** create use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Assert
    await expect(deleteCommentUseCase.execute('thread-123', 'comment-123', 'user-100'))
      .rejects
      .toThrow(AuthorizationError);
    expect(mockThreadRepository.verifyThreadAvailability).toHaveBeenCalledWith('thread-123');
    expect(mockCommentRepository.findCommentById).toHaveBeenCalledWith('comment-123');
  });

  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const comment = {
      comment_id: 'comment-123',
      comment_content: 'comment',
      comemnt_date: '2024-03-12',
      comment_is_delete: false,
      fk_thread_id: 'thread-123',
      fk_user_id: 'user-123',
    };

    /** Create dependencies of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadAvailability = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.findCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve(comment));
    mockCommentRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** create use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    await deleteCommentUseCase.execute('thread-123', 'comment-123', 'user-123');

    // Assert
    expect(mockThreadRepository.verifyThreadAvailability)
      .toHaveBeenCalledWith('thread-123');
    expect(mockCommentRepository.findCommentById)
      .toHaveBeenCalledWith('comment-123');
    expect(mockCommentRepository.deleteComment)
      .toHaveBeenCalledWith('comment-123');
  });
});
