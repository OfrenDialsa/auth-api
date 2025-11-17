/* istanbul ignore file */
const pool = require("../src/Infrastructure/database/postgres/pool");

const UsersTableTestHelper = {
    async addUser({
        id='user-123', username = 'nero', password = 'secret', fullname = 'neromarnero'
    }) {
        const query = {
            text: 'INSERT INTO users VALUES ($1, $2, $3, $4)',
            values: [id, username, password, fullname],
        };

        await pool.query(query);
    },

    async findUsersById(id){
        const query ={
            text: 'SELECT * FROM users WHERE id = $1',
            values: [id],
        }

        const result = await pool.query(query);
        return result.rows;
    },

    async cleanTable(){
        await pool.query('TRUNCATE TABLE users');
    }
}

module.exports = UsersTableTestHelper;