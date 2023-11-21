class DetalheDaCompraRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }

    async inserirDetalheDaCompraDeServico(idCompra, idServico, quantidade, precoUnitario) {
        try {
            const sql = `INSERT INTO detalhesdacompra (id_compra, id_servico, quantidade, preco_unitario) VALUES ($1, $2, $3, $4) RETURNING id`;
            const params = [idCompra, idServico, quantidade, precoUnitario];
            const result = await this.databaseService.execute(sql, params);
            return result[0]
        } catch (error) {
            console.error('Erro ao inserir detalhe da compra:', error);
        }
    }

    async inserirDetalheDaCompraDeKit(idCompra, idKit, quantidade, precoUnitario) {
        try {
            const sql = `INSERT INTO detalhesdacompra (id_compra, id_kit, quantidade, preco_unitario) VALUES ($1, $2, $3, $4) RETURNING id`;
            const params = [idCompra, idKit, quantidade, precoUnitario];
            const result = await this.databaseService.execute(sql, params);
            return result[0]
        } catch (error) {
            console.error('Erro ao inserir detalhe da compra de kit:', error);
        }
    }
}

module.exports = DetalheDaCompraRepository