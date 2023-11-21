class CriarServicoUseCase {
    constructor(servicoRepository) {
        this.servicoRepository = servicoRepository
    }

    async execute(nomeServico, preco) {
        const novoServico = await this.servicoRepository.inserirServico(nomeServico, preco);
        return { id_servico: novoServico.id }
    }
}

module.exports = CriarServicoUseCase