const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const GetAllThreadUseCase = require("../GetAllThreadUseCase");

describe('GetAllThreadUseCase', () => {
  it('should orchestrating get all thread action correctly', async () => {
    // Arrange
    const transformedThreads = [{
      id: 'thread-AqVg2b9JyQXR6wSQ2TmH4',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:59:16.198Z',
      username: 'dicoding',
    }];

    const expectedThreads = [{
      thread_id: 'thread-AqVg2b9JyQXR6wSQ2TmH4',
      thread_title: 'sebuah thread',
      thread_body: 'sebuah body thread',
      thread_date: '2021-08-08T07:59:16.198Z',
      fk_user_id: 'user-123',
      user_id: 'user-123',
      user_username: 'dicoding',
      user_password: '12345678',
      user_fullname: 'Dicoding Indonesia',
    }];

    /** create dependencies of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.getAllThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedThreads));

    /** create use case instance */
    const getAllThreadUseCase = new GetAllThreadUseCase({
      threadRepository: mockThreadRepository
    });

    // Action
    const threads = await getAllThreadUseCase.execute();

    // Assert
    expect(threads).toEqual(transformedThreads);
    expect(mockThreadRepository.getAllThread).toHaveBeenCalled();
  });
});