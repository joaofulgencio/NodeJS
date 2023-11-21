var express = require('express');
var router = express.Router();


/* Recuperar todos os servicos. */
router.get('/', async  (req, res, next) =>{
    try {
        let users = await req.container.listarTodosOsServicosUseCase.execute();
        console.log(users)
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao buscar serviços: ", error);
        res.status(500).json({error: "Erro ao buscar serviços"})
    }
});

/* Criar um servico */
router.post('/', async (req, res, next) => {
    try {
        let servicoCriado = await req.container.criarServicoUseCase.execute(req.body.nome_servico, req.body.preco)
        return res.status(201).json(servicoCriado)
    } catch (error) {
        console.error("Erro ao realizar a criação de um novo serviço: ", error);
        res.status(500).json({error: "Erro ao realizar a criação de um novo serviço"})
    }
})


/* Comprar um servico */
router.post('/comprar', async (req, res, next) => {
    try {
        let compraExecutada = await req.container.compraDeServicoUseCase.execute(req.body.id_usuario, req.body.id_cartao_de_servicos, req.body.servicos, req.body.valor_total)
        if (compraExecutada.error) {
           return res.status(422).json(compraExecutada)
        }
       return res.status(200).json(compraExecutada)
    } catch (error) {
        console.error("Erro ao realizar tentativa de compra: ", error);
        res.status(500).json({error: "Erro ao realizar tentativa de compra"})
    }
})

module.exports = router;
