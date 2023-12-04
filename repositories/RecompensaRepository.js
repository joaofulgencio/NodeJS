class RecompensaRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async adicionarRecompensaAoUsuario(idUsuario, descricao) {
        try {
            const sql = `
                INSERT INTO recompensas (descricao, id_usuario)
                VALUES ($1, $2)
                RETURNING id;
            `;
            const params = [descricao, idUsuario];
            const result = await this.databaseService.query(sql, params);
            return result.rows[0].id;
        } catch (error) {
            console.error('Erro ao adicionar recompensa ao usuário:', error);
            throw error;
        }
    }

    // Listar todas as recompensas de um usuário.
    async listarRecompensasDoUsuario(idUsuario) {
        try {
            const sql = `
                SELECT * FROM recompensas
                WHERE id_usuario = $1;
            `;
            const params = [idUsuario];
            const result = await this.databaseService.query(sql, params);
            return result.rows;
        } catch (error) {
            console.error('Erro ao listar recompensas do usuário:', error);
            throw error;
        }
    }

    // Utilizar uma recompensa.
    async utilizarRecompensa(idRecompensa) {
        try {
            const sql = `
                UPDATE recompensas
                SET ativa = false
                WHERE id = $1;
            `;
            const params = [idRecompensa];
            await this.databaseService.execute(sql, params);
            return { sucesso: true, mensagem: "Recompensa utilizada com sucesso." };
        } catch (error) {
            console.error('Erro ao utilizar recompensa:', error);
            throw error;
        }
    }

}

module.exports = RecompensaRepository