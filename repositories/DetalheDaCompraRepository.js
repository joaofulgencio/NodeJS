class DetalheDaCompraRepository {
    constructor(databaseService, recompensaRepository) {
        this.databaseService = databaseService;
        this.recompensaRepository = recompensaRepository;
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

    async contarServicosUtilizados(idCompra) {
        try {
            const sql = `
                SELECT COUNT(*) FROM detalhesdacompra
                WHERE id_compra = $1 AND utilizado = true;
            `;
            const params = [idCompra];
            const result = await this.databaseService.execute(sql, params);
            return parseInt(result[0].count, 10);
        } catch (error) {
            console.error('Erro ao contar serviços utilizados:', error);
            throw error;
        }
    }

    async utilizarTodosServicosDaCompra(idUsuario, idCompra) {
        try {
            const sql = `UPDATE detalhesdacompra SET utilizado = true WHERE id_compra = $1 AND utilizado = false`;
            const params = [idCompra];
            const result = await this.databaseService.executeUpdate(sql, params);
            if (result.rowCount === 0) {
                throw new Error('Nenhum serviço foi atualizado, verifique se o id da compra está correto e se os serviços já não foram utilizados.');
            }
            const numeroDeServicosUtilizados = await this.contarServicosUtilizados(idCompra);
            if (numeroDeServicosUtilizados >= 3) {
                await this.recompensaRepository.adicionarRecompensaAoUsuario(idUsuario, 'Recompensa por múltiplos serviços utilizados');
            }
            return { sucesso: true, mensagem: "Todos os serviços da compra foram marcados como utilizados." };
        } catch (error) {
            console.error('Erro ao utilizar todos os serviços da compra:', error);
            throw error;
        }
    }
    async buscarDetalhesDaCompra(idCompra) {
        try {
            const sql = `
                SELECT * FROM detalhesdacompra
                WHERE id_compra = $1;
            `;
            const params = [idCompra];
            const result = await this.databaseService.execute(sql, params);
            return result;
        } catch (error) {
            console.error('Erro ao listar detalhes da compra:', error);
            throw error;
        }
    }

}

module.exports = DetalheDaCompraRepository