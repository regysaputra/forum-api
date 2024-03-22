/* eslint-disable no-console */
/* eslint-disable max-len */
const NewAuth = require('../../Domains/authentications/entities/NewAuth');
const UserLogin = require('../../Domains/users/entities/UserLogin');

class GetAuthenticationUseCase {
  #userRepository;

  #authenticationRepository;

  #authenticationTokenManager;

  #passwordHash;

  constructor({
    userRepository,
    authenticationRepository,
    authenticationTokenManager,
    passwordHash,
  }) {
    this.#authenticationRepository = authenticationRepository;
    this.#userRepository = userRepository;
    this.#authenticationTokenManager = authenticationTokenManager;
    this.#passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const { username, password } = new UserLogin(useCasePayload);
    const encryptedPassword = await this.#userRepository.getPasswordByUsername(username);
    await this.#passwordHash.comparePassword(password, encryptedPassword);
    const id = await this.#userRepository.getIdByUsername(username);
    const accessToken = await this.#authenticationTokenManager.createAccessToken({ username, id });
    const refreshToken = await this.#authenticationTokenManager.createRefreshToken({ username, id });
    const newAuthentication = new NewAuth({
      accessToken,
      refreshToken,
    });
    await this.#authenticationRepository.addToken(newAuthentication.refreshToken);

    return newAuthentication;
  }
}

module.exports = GetAuthenticationUseCase;
