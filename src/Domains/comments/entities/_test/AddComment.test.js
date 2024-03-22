const AddComment = require('../AddComment');

describe('AddComment entities', () => {
  it('should throw error when payload not contain needed property or when userid', () => {
    // Arrange
    const payload = {};
    const threadid = 'thread-123';
    const userid = 'user-123';

    // Action & Assert
    expect(() => new AddComment(payload, threadid, userid)).toThrow('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 123,
    };
    const threadid = 'thread-123';
    const userid = 'user-123';

    // Action & Assert
    expect(() => new AddComment(payload, threadid, userid)).toThrow('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddComment object correctly', () => {
    // Arrange
    const payload = {
      content: 'comment',
    };
    const threadid = 'thread-123';
    const userid = 'user-123';

    // Action
    const addComment = new AddComment(payload, threadid, userid);

    // Assert
    expect(addComment).toBeInstanceOf(AddComment);
    expect(addComment.content).toEqual(payload.content);
    expect(addComment.threadid).toEqual(threadid);
    expect(addComment.userid).toEqual(userid);
  });
});
