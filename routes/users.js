var express = require('express');
var router = express.Router();

/* Recuperar todos os usuários. */
router.get('/', async  (req, res, next) =>{
  try {
    let users = await req.container.usuarioRepository.buscarTodosOsUsuarios();
    console.log(users)
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários: ", error);
    res.status(500).json({error: "Erro ao buscar usuários"})
  }
})



/* Recuperar cartões de serviço do usuário */
router.get('/:id_usuario/cartoes', async(req, res, next) => {
  try {
     let cartoes = await req.container.listarTodosCartoesDoUsuarioUseCase.execute(req.params.id_usuario);
     res.status(200).json(cartoes);
  } catch (error) {
    console.error("Erro ao buscar cartões de serviço: ", error);
      res.status(500).json({error: "Erro ao buscar cartões de serviço"})
  }
})

/* Criar um novo usuário */
router.post('/', async (req, res, next) => {
  try {
    let user = await req.container.usuarioRepository.inserirUsuario(req.body.user_name)
    res.json({result: "Usuário: " + req.body.user_name + " adicionado com sucesso" })
  } catch (error) {
    console.error("Erro ao inserir usuario: ", error);
    res.status(500).json({error: "Erro ao inserir usuários"})
  }
})

module.exports = router;
