class UtilizarRecompensa {
    constructor(recompensaRepository) {
        this.recompensaRepository = recompensaRepository
    }

    async execute(idRecompensa, idCartaoDeServicos, idKit) {
        return await this.recompensaRepository.registrarUtilizacaoDeRecompensa(idRecompensa, idCartaoDeServicos, idKit);
    }
}

module.exports = UtilizarRecompensa