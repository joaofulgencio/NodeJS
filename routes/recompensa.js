var express = require('express');
var router = express.Router();

// Can you generate a postman collection for this file?


// Utilizar recompensa
router.patch('/utilizar/:id_recompensa/usuario/:id_usuario', async (req, res, next) => {
    try {
        let recompensaUtilizada = await req.container.utilizarRecompensaUseCase.execute(req.params.id_recompensa, req.params.id_usuario)
        if (recompensaUtilizada.error) {
           return res.status(422).json(recompensaUtilizada)
        }
       return res.status(200).json(recompensaUtilizada)
    } catch (error) {
        console.error("Erro ao utilizar recompensa: ", error);
        res.status(500).json({error: "Erro ao utilizar recompensa"})
    }
})

// Listar recompensas do usuário.
router.get('/:id_usuario', async (req, res, next) => {
    try {
        let recompensas = await req.container.listarRecompensasDoUsuarioUseCase.execute(req.params.id_usuario)
        res.status(200).json(recompensas);
    } catch (error) {
        console.error("Erro ao listar recompensas do usuário: ", error);
        res.status(500).json({error: "Erro ao listar recompensas do usuário"})
    }
})

module.exports = router;