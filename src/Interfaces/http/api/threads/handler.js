const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const GetThreadUseCase = require('../../../../Applications/use_case/GetThreadUseCase');

class ThreadsHandler {
  #container;

  constructor(container) {
    this.#container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const addThreadUseCase = this.#container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase
      .execute(request.payload, request.auth.credentials.id);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });

    response.code(201);

    return response;
  }

  async getThreadHandler(request, h) {
    const getThreadUseCase = this.#container.getInstance(GetThreadUseCase.name);
    const thread = await getThreadUseCase
      .execute(request.params.threadId);
    // console.log('thread :', thread);
    const response = h.response({
      status: 'success',
      data: {
        thread,
      },
    });

    response.code(200);

    return response;
  }
}

module.exports = ThreadsHandler;
