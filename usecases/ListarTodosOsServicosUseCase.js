class ListarTodosOsServicosUseCase {
    constructor(servicoRepository) {
        this.servicoRepository = servicoRepository
    }

    async execute() {
        return await this.servicoRepository.buscarTodosOsServicos();
    }
}

module.exports = ListarTodosOsServicosUseCase