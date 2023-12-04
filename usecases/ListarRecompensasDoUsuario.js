
class ListarRecompensasDoUsuario {
    constructor(recompensaRepository) {
        this.recompensaRepository = recompensaRepository
    }

    async execute(idUsuario) {
        return await this.recompensaRepository.listarRecompensasDoUsuario(idUsuario);
    }
}

module.exports = ListarRecompensasDoUsuario