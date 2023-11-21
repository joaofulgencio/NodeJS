class CriarKitUseCase {
    constructor(kitDeServicoRepository) {
        this.kitDeServicoRepository = kitDeServicoRepository
    }

    async execute(nomeServico, preco) {
        const novoKitDeServico = await this.kitDeServicoRepository.inserirKitDeServico(nomeServico, preco);
        return { id_kit_servico: novoKitDeServico.id }
    }
}

module.exports = CriarKitUseCase