class CompraDeKitDeServicoUseCase {
    constructor(compraDeServicoRepository, detalheDaCompraRepository, cartaoDeServicoRepository) {
        this.compraDeServicoRepository = compraDeServicoRepository
        this.detalheDaCompraRepository = detalheDaCompraRepository
        this.cartaoDeServicoRepository = cartaoDeServicoRepository
    }

    async execute(idUsuario, idCartaoDeServicos, kits, valorTotal) {
        const compraExecutada = await this.compraDeServicoRepository.comprarServico(idUsuario, idCartaoDeServicos, new Date(), valorTotal);
        const detalhesDaCompraExecutada =
            await Promise.all(
                kits.map(
                    idKit =>
                        this.detalheDaCompraRepository.inserirDetalheDaCompraDeKit(compraExecutada.id, idKit, 1, valorTotal)
                )
            );
            return {id_da_compra: compraExecutada.id, id_detalhes_da_compra: detalhesDaCompraExecutada.map(detalhe => detalhe.id)}
    }
}

module.exports = CompraDeKitDeServicoUseCase
