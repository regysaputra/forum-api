const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const RepliesTabletestHelper = require('../../../../tests/RepliesTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const ServerError = require('../../../Commons/exceptions/ServerError');
const AddReply = require('../../../Domains/replies/entities/AddReply');
const AddedReply = require('../../../Domains/replies/entities/AddedReply');
const pool = require('../../database/postgres/pool');
const ReplyRepositoryPostgres = require('../ReplyRepositoryPostgres');

describe('ReplyRepositoryPostgres', () => {
  afterEach(async () => {
    await RepliesTabletestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addReply function', () => {
    it('should throw ServerError when errors from database', async () => {
      // Arrange
      const addReply = new AddReply({
        content: 'reply',
      }, 'comment-123', 'user-123');

      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action & Assert
      await expect(replyRepositoryPostgres.addReply(addReply))
        .rejects
        .toThrow(ServerError);
    });

    it('should persist add reply', async () => {
      // Arrange
      const addReply = new AddReply({
        content: 'reply',
      }, 'comment-123', 'user-123');

      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});

      // Action
      await replyRepositoryPostgres.addReply(addReply);
      const reply = await RepliesTabletestHelper.findReplyById('reply-123');

      // Assert
      expect(reply).toHaveLength(1);
    });

    it('should return added reply correctly', async () => {
      // Arrange
      const addReply = new AddReply({
        content: 'reply',
      }, 'comment-123', 'user-123');

      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      const addedReply = await replyRepositoryPostgres.addReply(addReply);

      // Assert
      expect(addedReply).toStrictEqual(new AddedReply({
        id: 'reply-123',
        content: 'reply',
        owner: 'user-123',
      }));
    });
  });

  describe('findReplyById function', () => {
    it('should throw NotFoundError when reply does not exist', async () => {
      // Arrange
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      // Action & Assert
      expect(replyRepositoryPostgres.findReplyById('invalid_id'))
        .rejects
        .toThrow(NotFoundError);
    });

    it('should return reply', async () => {
      // Arrange
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTabletestHelper.addReplies({});

      // Action
      const reply = await replyRepositoryPostgres.findReplyById('reply-123');

      // Assert
      expect(reply.reply_id).toEqual('reply-123');
      expect(reply.reply_content).toEqual('sebuah balasan');
      expect(reply.reply_date).toBeDefined();
      expect(reply.reply_is_delete).toEqual(false);
      expect(reply.fk_comment_id).toEqual('comment-123');
      expect(reply.fk_user_id).toEqual('user-123');
    });
  });

  describe('getRepliesByCommentId', () => {
    it('should return empty array when reply not found', async () => {
      // Arrange
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      // Action
      const reply = await replyRepositoryPostgres.getRepliesByCommentId('comment');

      // Assert
      expect(reply).toEqual([]);
    });

    it('should return array containing reply', async () => {
      // Arrange
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTabletestHelper.addReplies({});

      // Action
      const replies = await replyRepositoryPostgres.getRepliesByCommentId('comment-123');

      // Assert
      expect(Array.isArray(replies)).toEqual(true);
      expect(typeof replies[0]).toEqual('object');
      expect(replies[0].reply_id).toEqual('reply-123');
      expect(replies[0].reply_content).toEqual('sebuah balasan');
      expect(typeof replies[0].reply_date).toEqual('object');
      expect(replies[0].user_username).toEqual('dicoding');
      expect(typeof replies[0].reply_is_delete).toEqual('boolean');
    });
  });

  describe('deleteReply function', () => {
    it('should delete reply successfuly', async () => {
      // Arrange
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTabletestHelper.addReplies({});

      // Action
      await replyRepositoryPostgres.deleteReply('reply-123');
      const reply = await RepliesTabletestHelper.findReplyById('reply-123');

      // Assert
      expect(reply[0].reply_is_delete).toEqual(true);
    });
  });
});
