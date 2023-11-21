var express = require('express');
var router = express.Router();

/* Recuperar todos os kits de serviços. */
router.get('/', async  (req, res, next) =>{
    try {
        let users = await req.container.listarTodosKitsDeServicosUseCase.execute();
        console.log(users)
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao buscar kits de serviços: ", error);
        res.status(500).json({error: "Erro ao buscar kits de serviços"})
    }
});

/* Criar um kit */
router.post('/', async (req, res, next) => {
    try {
        let servicoCriado = await req.container.criarKitDeServicosUseCase.execute(req.body.nome_kit_de_servicos, req.body.preco)
        res.status(201).json(servicoCriado)
    } catch (error) {
        console.error("Erro ao realizar a criação de um novo serviço: ", error);
        res.status(500).json({error: "Erro ao realizar a criação de um novo serviço"})
    }
})


/* Comprar um kit */
router.post('/comprar', async (req, res, next) => {
    try {
        let compraExecutada = await req.container.compraDeKitDeServicoUseCase.execute(req.body.id_usuario, req.body.id_cartao_de_servicos, req.body.kits, req.body.valor_total)
        res.status(200).json(compraExecutada)
    } catch (error) {
        console.error("Erro ao realizar tentativa de compra: ", error);
        res.status(500).json({error: "Erro ao realizar tentativa de compra"})
    }
})

module.exports = router;
