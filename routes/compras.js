var express = require('express');
var router = express.Router();

router.get('/:id_usuario', async (req, res, next) => {
    try {
        const idUsuario = req.params.id_usuario;
        const compras = await req.container.compraDeServicoRepository.buscarCompraPorUsuario(idUsuario);
        res.json(compras);
    } catch (error) {
        console.error("Erro ao buscar compras do usuário: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.get('/:id_compra/detalhes', async (req, res, next) => {
    try {
        const idCompra = req.params.id_compra;
        const detalhes = await req.container.detalheDaCompraRepository.buscarDetalhesDaCompra(idCompra);
        res.json(detalhes);
    } catch (error) {
        console.error("Erro ao buscar detalhes da compra: ", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

module.exports = router;
