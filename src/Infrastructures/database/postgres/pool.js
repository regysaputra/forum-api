/* istanbul ignore file */
const { Pool } = require('pg');
const config = require('../../../Commons/config');

// @ts-ignore
const pool = new Pool(config.database);

module.exports = pool;
