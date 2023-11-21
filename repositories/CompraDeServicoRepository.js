class CompraDeServicoRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }

    async comprarServico(idUsuario, idCartao, dataDaCompra, valorTotal) {
        try {
            const sql = `INSERT INTO comprasdeservicos (id_usuario, id_cartao_de_servicos, data_da_compra, valor_total) VALUES ($1, $2, $3, $4) RETURNING id`;
            const params = [ idUsuario, idCartao, dataDaCompra, valorTotal ];
            const result = await this.databaseService.execute(sql, params);
            return result[0]
        } catch (error) {
            console.error('Erro ao inserir compra de serviço:', error);
        }
    }


}

module.exports = CompraDeServicoRepository