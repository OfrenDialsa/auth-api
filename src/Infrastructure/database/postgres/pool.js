/* istanbul ignore file */
const { Pool } = require("pg");
const config = require("../../../Common/config");

const pool = new Pool(config.database)

module.exports = pool;