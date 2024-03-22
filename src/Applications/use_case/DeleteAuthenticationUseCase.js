class DeleteAuthenticationUseCase {
  #authenticationRepository;

  constructor({ authenticationRepository }) {
    this.#authenticationRepository = authenticationRepository;
  }

  async execute(useCasePayload) {
    DeleteAuthenticationUseCase.#validatePayload(useCasePayload);

    const { refreshToken } = useCasePayload;
    await this.#authenticationRepository.checkAvailabilityToken(refreshToken);
    await this.#authenticationRepository.deleteToken(refreshToken);
  }

  static #validatePayload(payload) {
    const { refreshToken } = payload;

    if (!refreshToken) {
      throw new Error('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteAuthenticationUseCase;
