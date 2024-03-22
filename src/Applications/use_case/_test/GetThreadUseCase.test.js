const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadUseCase = require('../GetThreadUseCase');

describe('GetThreadUseCase', () => {
  it('should orchestrating the get thread action correctly', async () => {
    // Arrange
    const threadId = 'thread-AqVg2b9JyQXR6wSQ2TmH4';
    const commentId = 'comment-q_0uToswNf6i24RDYZJI3';
    const thread = {
      thread_id: 'thread-AqVg2b9JyQXR6wSQ2TmH4',
      thread_title: 'sebuah thread',
      thread_body: 'sebuah body thread',
      thread_date: '2021-08-08T07:59:16.198Z',
      fk_user_id: 'user-123',
      user_id: 'user-123',
      user_username: 'dicoding',
      user_password: '12345678',
      user_fullname: 'Dicoding Indonesia',
    };
    const comments = [
      {
        comment_id: 'comment-q_0uToswNf6i24RDYZJI3',
        comment_content: 'sebuah comment',
        comment_date: '2021-08-08T07:59:18.982Z',
        comment_is_delete: false,
        fk_thread_id: 'thread-AqVg2b9JyQXR6wSQ2TmH4',
        fk_user_id: 'user-123',
        user_id: 'user-123',
        user_username: 'dicoding',
        user_password: '12345678',
        user_fullname: 'Dicoding Indonesia',
      },
      {
        comment_id: 'comment-dUyuToswNf0Z24RDYZJKO',
        comment_content: 'sebuah comment',
        comment_date: '2021-08-10T07:59:18.982Z',
        comment_is_delete: true,
        fk_thread_id: 'thread-AqVg2b9JyQXR6wSQ2TmH4',
        fk_user_id: 'user-100',
        user_id: 'user-100',
        user_username: 'andi',
        user_password: '12345678',
        user_fullname: 'Andi Maulana',
      },
    ];
    const replies = [
      {
        reply_id: 'reply-BErOXUSefjwWGW1Z10Ihk',
        reply_content: 'sebuah balasan',
        reply_date: '2021-08-08T07:59:48.766Z',
        reply_is_delete: true,
        fk_comment_id: 'comment-q_0uToswNf6i24RDYZJI3',
        fk_user_id: 'user-100',
        user_id: 'user-100',
        user_username: 'johndoe',
        user_password: '12345678',
        user_fullname: 'John Doe',
      },
      {
        reply_id: 'reply-xNBtm9HPR-492AeiimpfN',
        reply_content: 'sebuah balasan',
        reply_date: '2021-08-08T08:07:01.522Z',
        reply_is_delete: false,
        fk_comment_id: 'comment-q_0uToswNf6i24RDYZJI3',
        fk_user_id: 'user-123',
        user_id: 'user-123',
        user_username: 'dicoding',
        user_password: '12345678',
        user_fullname: 'Dicoding Indonesia',
      },
    ];

    const transformThread = {
      id: 'thread-AqVg2b9JyQXR6wSQ2TmH4',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:59:16.198Z',
      username: 'dicoding',
      comments: [
        {
          id: 'comment-q_0uToswNf6i24RDYZJI3',
          username: 'dicoding',
          date: '2021-08-08T07:59:18.982Z',
          content: 'sebuah comment',
          replies: [
            {
              id: 'reply-BErOXUSefjwWGW1Z10Ihk',
              content: '**balasan telah dihapus**',
              date: '2021-08-08T07:59:48.766Z',
              username: 'johndoe',
            },
            {
              id: 'reply-xNBtm9HPR-492AeiimpfN',
              content: 'sebuah balasan',
              date: '2021-08-08T08:07:01.522Z',
              username: 'dicoding',
            },
          ],
        },
        {
          id: 'comment-dUyuToswNf0Z24RDYZJKO',
          username: 'andi',
          date: '2021-08-10T07:59:18.982Z',
          content: '**komentar telah dihapus**',
          replies: [
            {
              id: 'reply-BErOXUSefjwWGW1Z10Ihk',
              content: '**balasan telah dihapus**',
              date: '2021-08-08T07:59:48.766Z',
              username: 'johndoe',
            },
            {
              id: 'reply-xNBtm9HPR-492AeiimpfN',
              content: 'sebuah balasan',
              date: '2021-08-08T08:07:01.522Z',
              username: 'dicoding',
            },
          ],
        },
      ],
    };

    /** create dependencies of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(thread));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(comments));
    mockReplyRepository.getRepliesByCommentId = jest.fn()
      .mockImplementation(() => Promise.resolve(replies));

    /** create use case instance */
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const detailThread = await getThreadUseCase.execute(threadId);

    // Assert
    expect(detailThread).toEqual(transformThread);
    expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toHaveBeenCalledWith(threadId);
    expect(mockReplyRepository.getRepliesByCommentId).toHaveBeenCalledWith(commentId);
  });
});
