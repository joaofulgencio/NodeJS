class UtilizarServicoUseCase {
    constructor(detalheDaCompraRepository) {
        this.detalheDaCompraRepository = detalheDaCompraRepository;
    }

    async execute(idUsuario, idDetalheDaCompra) {
        return await this.detalheDaCompraRepository.utilizarTodosServicosDaCompra(idUsuario, idDetalheDaCompra);
    }
}

module.exports = UtilizarServicoUseCase