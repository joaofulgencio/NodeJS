var express = require('express');
var logger = require('morgan');
var cors = require('cors')
var middleWareGlobal = require('./middlewares/global')

var usersRouter = require('./routes/users');
var cartoesRouter = require('./routes/cartoes');
var servicosRouter = require('./routes/servicos');
var kitsRouter = require('./routes/kits');

const DependencyContainer = require('./container/DependencyContainer')

const container = new DependencyContainer()

async function initializeApp() {

    //Chamando o método initialize para startar minha conexão com o banco de dados
    // que já está referenciado dentro dos meus repositórios assim não tendo que realizar a conexão
    // em cada arquivo que tenha necessidade iteragir com o banco de dados
    await container.initialize()

    var app = express();
    app.use(express.json());
    app.use(middleWareGlobal)
    app.use(cors())

    // Middleware para passar o container como parâmetro do request para todas as rotas
    app.use((req, res, next) => {
        req.container = container;
        next()
    })

    app.use('/users', usersRouter);
    app.use('/cartoes', cartoesRouter)
    app.use('/servicos', servicosRouter)
    app.use('/kits', kitsRouter)

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}


//Inicializando o container e a aplicação node
initializeApp()