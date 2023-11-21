class CartaoDeServicoRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }

    async gerarCartaoDeServico(idUsuario) {
        try {
            // buscar cartao de servico pelo id do usuario e se já existir retornar o cartao de servico existente
            const cartaoDeServico = await this.buscarCartoesDeServicoPorIdUsuario(idUsuario);
            if (cartaoDeServico.length > 0) {
                return cartaoDeServico[0];
            }
            const sql = `INSERT INTO cartoesdeservicos (id_usuario) VALUES ($1) RETURNING id, id_usuario`;
            const params = [ parseInt(idUsuario) ];
            const result = await this.databaseService.executeInsert(sql, params);
            return result[0];
        } catch (error) {
            console.error('Erro ao inserir cartão de serviço:', error);
        }
    }

    // buscar cartao de servico pelo id do usuario
    async buscarCartoesDeServicoPorIdUsuario(idUsuario) {
        const sql = `SELECT * FROM cartoesdeservicos WHERE id_usuario = $1`
        const params = [parseInt(idUsuario)]
        return await this.databaseService.execute(sql, params)
    }
}

module.exports = CartaoDeServicoRepository