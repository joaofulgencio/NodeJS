class ListarTodosCartoesDoUsuarioUseCase {
    constructor(servicoRepository) {
        this.servicoRepository = servicoRepository
    }

    async execute(idUsuario) {
        const result = await this.servicoRepository.buscarCartoesDeServicoPorIdUsuario(idUsuario)
        return result
    }
}

module.exports = ListarTodosCartoesDoUsuarioUseCase