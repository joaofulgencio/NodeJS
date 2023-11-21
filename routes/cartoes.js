var express = require('express');
var router = express.Router();

/* Gerar um novo cartão de serviços */
router.post('/:id_usuario', async (req, res, next) => {
    try {
        let novoCartão = await req.container.gerarCartaoDeServicoUseCase.execute(req.params.id_usuario)
        res.status(201).json(novoCartão)
    } catch (error) {
        console.error("Erro ao gerar novo cartão: ", error);
        res.status(500).json({error: "Erro ao gerar novo cartão"})
    }
})

module.exports = router;
