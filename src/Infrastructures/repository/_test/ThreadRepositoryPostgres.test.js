/* eslint-disable max-len */
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const ServerError = require('../../../Commons/exceptions/ServerError');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should throw ServerError when error occurs from database', async () => {
      // Arrange
      const addThread = new AddThread({
        title: 'Thread Title',
        body: 'content',
      }, 'user-100');
      const fakeIdGenerator = () => '123'; // stub

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      // Action & Assert
      await expect(threadRepositoryPostgres.addThread(addThread))
        .rejects
        .toThrow(ServerError);
    });

    it('should persist add thread ', async () => {
      // Arrange
      const addThread = new AddThread({
        title: 'Thread Title',
        body: 'content',
      }, 'user-123');
      const fakeIdGenerator = () => '123'; // stub

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await UsersTableTestHelper.addUser({});
      await threadRepositoryPostgres.addThread(addThread);

      // Assert
      const thread = await ThreadsTableTestHelper.verifyThreadAvailability('thread-123');
      expect(thread).toHaveLength(1);
    });

    it('should return added thread correctly', async () => {
      // Arrange
      const userid = 'user-123';

      const addThread = new AddThread({
        title: 'Thread Title',
        body: 'content',
      }, userid);

      const fakeIdGenerator = () => '123'; // stub
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await UsersTableTestHelper.addUser({});
      const addedThread = await threadRepositoryPostgres.addThread(addThread);

      // Assert
      expect(addedThread).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: addThread.title,
        owner: userid,
      }));
    });
  });

  describe('verifyThreadAvailability function', () => {
    it('should throw NotFoundError when thread not found', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.verifyThreadAvailability('thread'))
        .rejects
        .toThrow(NotFoundError);
    });

    it('should not throw NotFoundError when thread exist', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});

      // Action & Assert
      await expect(threadRepositoryPostgres.verifyThreadAvailability('thread-123'))
        .resolves
        .not
        .toThrow(NotFoundError);
    });
  });

  describe('getThreadById function', () => {
    it('should throw NotFoundError when thread not found', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.getThreadById('thread'))
        .rejects
        .toThrow(NotFoundError);
    });

    it('should return thread', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      const threadId = 'thread-123';

      // Action
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      const thread = await threadRepositoryPostgres.getThreadById(threadId);

      // Assert
      expect(typeof thread).toEqual('object');
      expect(thread.thread_id).toEqual('thread-123');
      expect(thread.thread_title).toEqual('sebuah thread');
      expect(thread.thread_body).toEqual('sebuah body thread');
      expect(typeof thread.thread_date).toEqual('object');
      expect(thread.user_username).toEqual('dicoding');
    });
  });
});
