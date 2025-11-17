/* istanbul ignore file */
import { Pool } from "pg";
import config from "../../../Common/config";

const pool = new Pool(config.database)

export default pool;