const UserLogin = require('../UserLogin');

describe('UserLogin entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
    };

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrow('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload does not meet data type specification', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      password: 12345678,
    };

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrow('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when username contains restricted character', () => {
    // Arrange
    const payload = {
      username: '@=dicoding',
      password: '12345678',
    };

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrow('USER_LOGIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should create UserLogin entities corrrectly', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      password: '12345678',
    };

    // Action
    const userLogin = new UserLogin(payload);

    // Assert
    expect(userLogin).toBeInstanceOf(UserLogin);
    expect(userLogin.username).toEqual(payload.username);
    expect(userLogin.password).toEqual(payload.password);
  });
});
