class ServicoRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }

    async inserirServico(nomeDoServico, preco) {
        try {
            const sql = `INSERT INTO servicos (nome_do_servico, preco) VALUES ($1, $2) RETURNING id`;
            const params = [ nomeDoServico, preco ];
            const result = await this.databaseService.executeInsert(sql, params);
            return result[0]
        } catch (error) {
            console.error('Erro ao inserir serviço:', error);
        }
    }

    async buscarTodosOsServicos() {
        console.log("executando Query")
        const sql = `SELECT * FROM servicos`
        return await this.databaseService.execute(sql)
    }
}

module.exports = ServicoRepository