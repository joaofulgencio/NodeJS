class RecompensaRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async adicionarRecompensaAoUsuario(idUsuario, descricao) {
        try {
            const sql = `INSERT INTO recompensas (id_usuario, descricao) VALUES ($1, $2) RETURNING id`;
            const params = [parseInt(idUsuario), descricao];
            const result = await this.databaseService.execute(sql, params);
            return result[0].id;
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
            return await this.databaseService.execute(sql, params);
        } catch (error) {
            console.error('Erro ao listar recompensas do usuário:', error);
            throw error;
        }
    }


    async registrarUtilizacaoDeRecompensa(idRecompensa, idUsuario) {
        try {
            const sql = `
            INSERT INTO utilizacaoderecompensas
            (id_recompensa, id_usuario, data_utilizacao, utilizada)
            VALUES ($1, $2, CURRENT_DATE, true);
        `;
            const params = [idRecompensa, idUsuario];
            const result = await this.databaseService.execute(sql, params);
            return { sucesso: true, mensagem: "Registro de utilização de recompensa efetuado com sucesso." };
        } catch (error) {
            console.error('Erro ao registrar utilização da recompensa:', error);
            throw error;
        }
    }

}

module.exports = RecompensaRepository