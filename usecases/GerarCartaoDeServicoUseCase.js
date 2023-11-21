class GerarCartaoDeServicoUseCase {
    constructor(cartaoDeServicoRepository) {
        this.cartaoDeServicoRepository = cartaoDeServicoRepository
    }

    async execute(idUsuario) {
        const novoCartao = await this.cartaoDeServicoRepository.gerarCartaoDeServico(idUsuario);
        return { id_cartao: novoCartao.id, idUsuario: novoCartao.id_usuario, usado: novoCartao.usado }
    }
}

module.exports = GerarCartaoDeServicoUseCase