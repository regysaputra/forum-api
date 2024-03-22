const DeleteAuthenticationUseCase = require('../../../../Applications/use_case/DeleteAuthenticationUseCase');
const GetAuthenticationUseCase = require('../../../../Applications/use_case/GetAuthenticationUseCase');
const RefreshAuthenticationUseCase = require('../../../../Applications/use_case/RefreshAuthenticationUseCase');

class AuthenticationsHandler {
  #container;

  constructor(container) {
    this.#container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    const getAuthenticationUseCase = this.#container.getInstance(GetAuthenticationUseCase.name);
    const { accessToken, refreshToken } = await getAuthenticationUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });

    response.code(201);

    return response;
  }

  async putAuthenticationHandler(request) {
    const refreshAuthenticationUseCase = this.#container
      .getInstance(RefreshAuthenticationUseCase.name);
    const accessToken = await refreshAuthenticationUseCase.execute(request.payload);

    return {
      status: 'success',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request) {
    const deleteAuthenticationUseCase = this.#container
      .getInstance(DeleteAuthenticationUseCase.name);
    await deleteAuthenticationUseCase.execute(request.payload);

    return {
      status: 'success',
    };
  }
}

module.exports = AuthenticationsHandler;
