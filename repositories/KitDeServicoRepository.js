class KitDeServicoRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }

    async inserirKitDeServico(nomeDoKit, precoDoKit) {
        try {
            const sql = `INSERT INTO kitsdeservicos (nome_do_kit, preco) VALUES ($1, $2) RETURNING id`;
            const params = [nomeDoKit, precoDoKit ];
            const result = await this.databaseService.executeInsert(sql, params);
            return result[0]
        } catch (error) {
            console.error('Erro ao inserir kit de serviço:', error);
        }
    }

    async buscarTodosOsKitsDeServico() {
        console.log("executando Query")
        const sql = `SELECT * FROM kitsdeservicos`
        return await this.databaseService.execute(sql)
    }

}

module.exports = KitDeServicoRepository