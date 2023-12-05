class UtilizarServicoUseCase {
    constructor(detalheDaCompraRepository) {
        this.detalheDaCompraRepository = detalheDaCompraRepository;
    }

    async execute(idUsuario, idCompra) {
        return await this.detalheDaCompraRepository.utilizarTodosServicosDaCompra(idUsuario, idCompra);
    }
}

module.exports = UtilizarServicoUseCase