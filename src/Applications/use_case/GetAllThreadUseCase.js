class GetAllThreadUseCase {
  #threadRepository;
  
  constructor({ threadRepository }) {
    this.#threadRepository = threadRepository;
  }

  async #transform(threads) {
    const results = [];

    threads.forEach(thread => {
      const {
        thread_id: id,
        thread_title: title,
        thread_body: body,
        thread_date: date,
        user_username: username,
      } = thread;

      results.push({
        id, title, body, date, username
      });
    });

    return results;
  }

  async execute() {
    const threads = await this.#threadRepository.getAllThread();

    return this.#transform(threads);
  }
}

module.exports = GetAllThreadUseCase;