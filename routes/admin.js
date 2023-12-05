var express = require('express');
var router = express.Router();

/* listarVendasDeServicosIndividuais */
router.get('/vendas/servicos', async (req, res, next) => {
    try {
        let vendas = await req.container.adminRepository.listarVendasDeServicosIndividuais()
        res.status(200).json(vendas)
    } catch (error) {
        console.error("Erro ao listar vendas de serviços individuais: ", error);
        res.status(500).json({error: "Erro ao listar vendas de serviços individuais"})
    }
})

/* listarVendasDeKitsDeServicos */
router.get('/vendas/kits', async (req, res, next) => {
    try {
        let vendas = await req.container.adminRepository.listarVendasDeKitsDeServicos()
        res.status(200).json(vendas)
    } catch (error) {
        console.error("Erro ao listar vendas de kits de serviços: ", error);
        res.status(500).json({error: "Erro ao listar vendas de kits de serviços"})
    }
})

/* listarServicosUtilizadosPorTipo */
router.get('/servicos/utilizados', async (req, res, next) => {
    try {
        let servicos = await req.container.adminRepository.listarServicosUtilizadosPorTipo()
        res.status(200).json(servicos)
    } catch (error) {
        console.error("Erro ao listar serviços utilizados por tipo: ", error);
        res.status(500).json({error: "Erro ao listar serviços utilizados por tipo"})
    }
})

/* listarQuantidadeDeRecompensasGeradas */
router.get('/recompensas', async (req, res, next) => {
    try {
        let recompensas = await req.container.adminRepository.listarQuantidadeDeRecompensasGeradas()
        res.status(200).json(recompensas)
    } catch (error) {
        console.error("Erro ao listar quantidade de recompensas geradas: ", error);
        res.status(500).json({error: "Erro ao listar quantidade de recompensas geradas"})
    }
})

/* listarServicosIndividuaisNaoUtilizados */
router.get('/servicos/nao-utilizados', async (req, res, next) => {
    try {
        let servicos = await req.container.adminRepository.listarServicosIndividuaisNaoUtilizados()
        res.status(200).json(servicos)
    } catch (error) {
        console.error("Erro ao listar serviços individuais não utilizados: ", error);
        res.status(500).json({error: "Erro ao listar serviços individuais não utilizados"})
    }
})

/* listarKitsDeServicosNaoUtilizados */
router.get('/kits/nao-utilizados', async (req, res, next) => {
    try {
        let kits = await req.container.adminRepository.listarKitsDeServicosNaoUtilizados()
        res.status(200).json(kits)
    } catch (error) {
        console.error("Erro ao listar kits de serviços não utilizados: ", error);
        res.status(500).json({error: "Erro ao listar kits de serviços não utilizados"})
    }
})

module.exports = router;