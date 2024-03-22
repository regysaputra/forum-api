const AddThread = require('../AddThread');

describe('AddThread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      body: 'content',
    };

    const userid = 'user-123';

    // Action & Assert
    expect(() => new AddThread(payload, userid)).toThrow('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      body: 'content',
    };

    const userid = 'user-123';

    // Action & Assert
    expect(() => new AddThread(payload, userid)).toThrow('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddThread enities correctly', () => {
    // Arrange
    const payload = {
      title: 'Thread Title',
      body: 'content',
    };
    const userid = 'user-123';

    // Action
    const addThread = new AddThread(payload, userid);

    // Assert
    expect(addThread).toBeInstanceOf(AddThread);
    expect(addThread.title).toEqual(payload.title);
    expect(addThread.body).toEqual(payload.body);
    expect(addThread.userid).toEqual(userid);
  });
});
