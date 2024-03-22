const AddThread = require('../../Domains/threads/entities/AddThread');

class AddThreadUseCase {
  #threadRepository;

  constructor({ threadRepository }) {
    this.#threadRepository = threadRepository;
  }

  async execute(useCasePayload, userid) {
    const addThread = new AddThread(useCasePayload, userid);

    return this.#threadRepository.addThread(addThread);
  }
}

module.exports = AddThreadUseCase;
