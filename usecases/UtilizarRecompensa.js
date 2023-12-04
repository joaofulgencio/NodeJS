class UtilizarRecompensa {
    constructor(recompensaRepository) {
        this.recompensaRepository = recompensaRepository
    }

    async execute(idRecompensa) {
        return await this.recompensaRepository.utilizarRecompensa(idRecompensa);
    }
}

module.exports = UtilizarRecompensa