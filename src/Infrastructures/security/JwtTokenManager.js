const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager');
const config = require('../../Commons/config');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class JwtTokenManager extends AuthenticationTokenManager {
  #jwt;

  constructor(jwt) {
    super();
    this.#jwt = jwt;
  }

  async createAccessToken(payload) {
    return this.#jwt.generate(payload, config.security.accessToken);
  }

  async createRefreshToken(payload) {
    return this.#jwt.generate(payload, config.security.refreshToken);
  }

  // @ts-ignore
  async verifyAccessToken(token) {
    try {
      const artifacts = this.#jwt.decode(token);
      this.#jwt.verify(artifacts, config.security.accessToken);

      return true;
    } catch (error) {
      return false;
    }
  }

  async verifyRefreshToken(token) {
    try {
      const artifacts = this.#jwt.decode(token);
      this.#jwt.verify(artifacts, config.security.refreshToken);
    } catch (error) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  async decodePayload(token) {
    const artifacts = this.#jwt.decode(token);
    return artifacts.decoded.payload;
  }
}

module.exports = JwtTokenManager;
