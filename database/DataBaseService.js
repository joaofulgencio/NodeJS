class DatabaseService {
    constructor(connection) {
        this.connection = connection;
    }

    async execute(query, params = []) {
        let connection
        try {
            connection = await this.connection.getConnection();
            const result = await connection.query(query, params);
            return result.rows; // Resultado do select
        } catch (error) {
            console.error('Erro na execução da consulta:', error);
            return [];
        } finally {
            connection.release();
        }
    }

    async executeInsert(query, params = []) {
        let connection
        try {
            connection = await this.connection.getConnection();
            const result = await connection.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('Erro na execução da inserção:', error);
            return 0;
        } finally {
            connection.release();
        }
    }

}

module.exports = DatabaseService