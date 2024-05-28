const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const ServerError = require('../../../Commons/exceptions/ServerError');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addComment function', () => {
    it('should throw ServerError when an error occurs in the database', async () => {
      // Arrange
      const addComment = new AddComment({
        content: 'comment',
      }, 'thread-123', 'user-123');

      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action & Assert
      await expect(commentRepositoryPostgres.addComment(addComment))
        .rejects
        .toThrow(ServerError);
    }, 20000);

    it('should persist add comment', async () => {
      // Arrange
      const addComment = new AddComment({
        content: 'comment',
      }, 'thread-123', 'user-123');
      const fakeIdGenerator = () => '123'; // stub
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});

      // Action
      await commentRepositoryPostgres.addComment(addComment);

      // Assert
      const comment = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(comment).toHaveLength(1);
    }, 20000);

    it('should return added comment correctly', async () => {
      // Arrange
      const addComment = new AddComment({
        content: 'comment',
      }, 'thread-123', 'user-123');

      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});

      // Action
      const addedComment = await commentRepositoryPostgres.addComment(addComment);

      // Assert
      expect(addedComment).toStrictEqual(new AddedComment({
        id: 'comment-123',
        content: 'comment',
        owner: 'user-123',
      }));
    }, 20000);
  });

  describe('verifyCommentAvailability function', () => {
    it('should throw NotFoundError when comment does not exist', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      expect(commentRepositoryPostgres.verifyCommentAvailability('invalid_id'))
        .rejects
        .toThrow(NotFoundError);
    }, 20000);

    it('should not throw NotFoundError when comment exist', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyCommentAvailability('comment-123'))
        .resolves
        .not
        .toThrow(NotFoundError);
    }, 20000);
  });

  describe('findCommentById function', () => {
    it('should throw NotFoundError when comment does not exist', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.findCommentById('invalid_id'))
        .rejects
        .toThrow(NotFoundError);
    }, 20000);

    it('should not throw NotFoundError when comment exist', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});

      // Action & Assert
      await expect(commentRepositoryPostgres.findCommentById('comment-123'))
        .resolves
        .not
        .toThrow(NotFoundError);
    }, 20000);

    it('should return comment when comment exist', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});

      // Action
      const comment = await commentRepositoryPostgres.findCommentById('comment-123');

      // Assert
      expect(typeof comment).toEqual('object');
      expect(comment.comment_id).toEqual('comment-123');
      expect(comment.comment_content).toEqual('sebuah komentar');
      expect(comment.comment_date).toBeDefined();
      expect(comment.comment_is_delete).toEqual(false);
      expect(comment.fk_thread_id).toEqual('thread-123');
      expect(comment.fk_user_id).toEqual('user-123');
    }, 20000);
  });

  describe('getCommentByThreadId', () => {
    it('should return empty array when comment not found', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      const comment = await commentRepositoryPostgres.getCommentsByThreadId('thread');

      // Assert
      expect(comment).toEqual([]);
    }, 20000);

    it('should return array containing comment', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});

      // Action
      const comments = await commentRepositoryPostgres.getCommentsByThreadId('thread-123');

      // Assert
      expect(Array.isArray(comments)).toEqual(true);
      expect(comments).toHaveLength(1);
      expect(typeof comments[0]).toEqual('object');
      expect(comments[0].comment_id).toEqual('comment-123');
      expect(comments[0].comment_content).toEqual('sebuah komentar');
      expect(typeof comments[0].comment_date).toEqual('object');
      expect(comments[0].user_username).toEqual('dicoding');
      expect(typeof comments[0].comment_is_delete).toEqual('boolean');
    }, 20000);
  });

  describe('deleteComment function', () => {
    it('should delete comment succesfully', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      const commentId = 'comment-123';
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});

      // Action
      await commentRepositoryPostgres.deleteComment(commentId);
      const comment = await CommentsTableTestHelper.findCommentById(commentId);

      // Assert
      expect(comment[0].comment_is_delete).toEqual(true);
    }, 20000);
  });
});
