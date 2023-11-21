const { Pool } = require('pg')
class DatabaseConnection {
    constructor() {
        this.pool = null;
    }

    async initialize() {
        this.pool = new Pool({
            user: 'joaooctf',
            password: 'imRM21GaqpSU',
            host: 'ep-jolly-pine-90068555.us-east-2.aws.neon.tech',
            port: 5432,
            database: 'introducaoweb',
            ssl: true,
            max: 5
        });
    }

    async getConnection() {
        return this.pool.connect();
    }


    async closeConnection() {
        return this.pool.end()
    }

}

module.exports = DatabaseConnection