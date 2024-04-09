const AddUserUseCase = require('../../../../Applications/use_case/AddUserUseCase');

class UsersHandler {
  #container;

  constructor(container) {
    this.#container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const addUserUseCase = this.#container.getInstance(AddUserUseCase.name);
    const { id, username, fullname } = await addUserUseCase.execute(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        addedUser: {
          id, username, fullname
        },
      },
    });

    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
