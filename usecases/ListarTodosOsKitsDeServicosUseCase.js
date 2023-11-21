class ListarTodosOsKitsDeServicosUseCase {
    constructor(kitDeServicoRepository) {
        this.kitDeServicoRepository = kitDeServicoRepository
    }

    async execute() {
        return await this.kitDeServicoRepository.buscarTodosOsKitsDeServico();
    }
}

module.exports = ListarTodosOsKitsDeServicosUseCase