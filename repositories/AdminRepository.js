class AdminRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }

    async listarVendasDeServicosIndividuais() {
        try {
            const sql = `
            SELECT servicos.nome_do_servico, COUNT(detalhesdacompra.id_servico) AS qtd_vendas
            FROM detalhesdacompra
            JOIN servicos ON detalhesdacompra.id_servico = servicos.id
            GROUP BY servicos.nome_do_servico;
        `;
            return await this.databaseService.execute(sql);
        } catch (error) {
            console.error('Erro ao listar vendas de serviços individuais:', error);
            throw error;
        }
    }

    async listarVendasDeKitsDeServicos() {
        try {
            const sql = `
            SELECT kitsdeservicos.nome_do_kit, COUNT(detalhesdacompra.id_kit) AS qtd_vendas
            FROM detalhesdacompra
            JOIN kitsdeservicos ON detalhesdacompra.id_kit = kitsdeservicos.id
            GROUP BY kitsdeservicos.nome_do_kit;
        `;
            return await this.databaseService.execute(sql);
        } catch (error) {
            console.error('Erro ao listar vendas de kits de serviços:', error);
            throw error;
        }
    }

    async listarServicosUtilizadosPorTipo() {
        try {
            const sql = `
            SELECT servicos.nome_do_servico, COUNT(detalhesdacompra.id_servico) AS qtd_utilizados
            FROM detalhesdacompra
            JOIN servicos ON detalhesdacompra.id_servico = servicos.id
            WHERE detalhesdacompra.utilizado = TRUE
            GROUP BY servicos.nome_do_servico;
        `;
            return await this.databaseService.execute(sql);
        } catch (error) {
            console.error('Erro ao listar serviços utilizados por tipo:', error);
            throw error;
        }
    }

    async listarQuantidadeDeRecompensasGeradas() {
        try {
            const sql = `
            SELECT COUNT(*) AS qtd_recompensas
            FROM recompensas;
        `;
            return await this.databaseService.execute(sql);
        } catch (error) {
            console.error('Erro ao listar quantidade de recompensas geradas:', error);
            throw error;
        }
    }

    async listarServicosIndividuaisNaoUtilizados() {
        try {
            const sql = `
            SELECT servicos.nome_do_servico, COUNT(detalhesdacompra.id_servico) AS qtd_nao_utilizados
            FROM detalhesdacompra
            JOIN servicos ON detalhesdacompra.id_servico = servicos.id
            WHERE detalhesdacompra.utilizado = FALSE
            GROUP BY servicos.nome_do_servico;
        `;
            return await this.databaseService.execute(sql);
        } catch (error) {
            console.error('Erro ao listar serviços individuais não utilizados:', error);
            throw error;
        }
    }

    async listarKitsDeServicosNaoUtilizados() {
        try {
            const sql = `
            SELECT kitsdeservicos.nome_do_kit, COUNT(detalhesdacompra.id_kit) AS qtd_nao_utilizados
            FROM detalhesdacompra
            JOIN kitsdeservicos ON detalhesdacompra.id_kit = kitsdeservicos.id
            WHERE detalhesdacompra.utilizado = FALSE
            GROUP BY kitsdeservicos.nome_do_kit;
        `;
            return await this.databaseService.execute(sql);
        } catch (error) {
            console.error('Erro ao listar kits de serviços não utilizados:', error);
            throw error;
        }
    }
}

module.exports = AdminRepository