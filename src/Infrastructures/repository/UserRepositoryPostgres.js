const InvariantError = require('../../Commons/exceptions/InvariantError');
const ServerError = require('../../Commons/exceptions/ServerError');
const UserRepository = require('../../Domains/users/UserRepository');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');

class UserRepositoryPostgres extends UserRepository {
  #pool;

  #idGenerator;

  constructor(pool, idGenerator) {
    super();
    this.#pool = pool;
    this.#idGenerator = idGenerator;
  }

  // @ts-ignore
  async addUser(registerUser) {
    const { username, password, fullname } = registerUser;
    const id = `user-${this.#idGenerator()}`;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING user_id AS id, user_username AS username, user_fullname AS fullname',
      values: [id, username, password, fullname],
    };

    let result;

    try {
      result = await this.#pool.query(query);
    } catch (error) {
      throw new ServerError(error.message);
    }

    return new RegisteredUser({ ...result.rows[0] });
  }

  async verifyAvailableUsername(username) {
    const query = {
      text: 'SELECT user_username FROM users WHERE user_username = $1',
      values: [username],
    };

    const result = await this.#pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('username tidak tersedia');
    }
  }

  async getPasswordByUsername(username) {
    const query = {
      text: 'SELECT user_password AS password FROM users WHERE user_username = $1',
      values: [username],
    };

    const result = await this.#pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('username tidak tersedia');
    }

    return result.rows[0].password;
  }

  async getIdByUsername(username) {
    const query = {
      text: 'SELECT user_id FROM users WHERE user_username = $1',
      values: [username],
    };

    const result = await this.#pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('user tidak ditemukan');
    }

    const { user_id: id } = result.rows[0];

    return id;
  }
}

module.exports = UserRepositoryPostgres;
