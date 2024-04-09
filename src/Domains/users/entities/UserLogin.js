/* eslint-disable class-methods-use-this */
class UserLogin {
  constructor(payload) {
    if (payload === null) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    this.#verifyPayload(payload);

    const { username, password } = payload;

    this.username = username;
    this.password = password;
  }

  #verifyPayload({ username, password }) {
    if (!username || !password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (username.match(/\W/)) {
      throw new Error('USER_LOGIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }
  }
}

module.exports = UserLogin;
