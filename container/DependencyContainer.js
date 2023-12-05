var DatabaseConnection = require('../database/DatabaseConnection')
var DatabaseService = require('../database/DataBaseService')
var UsuarioRepository = require('../repositories/UsuarioRepository')
var ServicoRepository = require('../repositories/ServicoRepository')
var CartaoDeServicoRepository = require('../repositories/CartaoDeServicoRepository')
var KitDeServicoRepository = require('../repositories/KitDeServicoRepository')
var CompraDeServicoRepository = require('../repositories/CompraDeServicoRepository')
var DetalheDaCompraRepository = require('../repositories/DetalheDaCompraRepository')
var RecompensaRepository = require('../repositories/RecompensaRepository')
var GerarCartaoDeServicoUseCase = require('../usecases/GerarCartaoDeServicoUseCase')
var CompraDeServicoUseCase = require('../usecases/CompraDeServicoUseCase')
var CriarServicoUseCase = require('../usecases/CriarServicoUseCase')
var CriarKitUseCase = require('../usecases/CriarKitUseCase')
var CompraDeKitDeServicoUseCase = require('../usecases/CompraDeKitDeServicoUseCase')
var ListarTodosOsServicosUseCase = require('../usecases/ListarTodosOsServicosUseCase')
var ListarTodosKitsDeServicosUseCase = require('../usecases/ListarTodosOsKitsDeServicosUseCase')
var ListarTodosCartoesDoUsuarioUseCase= require('../usecases/ListarTodosCartoesDoUsuario')
var UtilizarServicoUseCase = require('../usecases/UtilizarServicoUseCase')
var ListarRecompensasDoUsuarioUseCase = require('../usecases/ListarRecompensasDoUsuario')
var UtilizarRecompensaUseCase = require('../usecases/UtilizarRecompensa')
var AdminRepository = require('../repositories/AdminRepository')
class DependencyContainer {
    constructor() {
        this.databaseConnection = new DatabaseConnection()
        this.databaseService = new DatabaseService(this.databaseConnection);
        this.usuarioRepository = new UsuarioRepository(this.databaseService);
        this.cartaoDeServicosRepository = new CartaoDeServicoRepository(this.databaseService);
        this.servicoRepository = new ServicoRepository(this.databaseService);
        this.kitDeServicosRepository = new KitDeServicoRepository(this.databaseService);
        this.compraDeServicoRepository = new CompraDeServicoRepository(this.databaseService);
        this.recompensaRepository = new RecompensaRepository(this.databaseService);
        this.detalheDaCompraRepository = new DetalheDaCompraRepository(this.databaseService, this.recompensaRepository);
        this.gerarCartaoDeServicoUseCase = new GerarCartaoDeServicoUseCase(this.cartaoDeServicosRepository)
        this.compraDeServicoUseCase = new CompraDeServicoUseCase(this.compraDeServicoRepository, this.detalheDaCompraRepository,
            this.cartaoDeServicosRepository)
        this.criarServicoUseCase = new CriarServicoUseCase(this.servicoRepository)
        this.criarKitDeServicosUseCase = new CriarKitUseCase(this.kitDeServicosRepository)
        this.compraDeKitDeServicoUseCase = new CompraDeKitDeServicoUseCase(this.compraDeServicoRepository, this.detalheDaCompraRepository,
            this.cartaoDeServicosRepository)
        this.listarTodosOsServicosUseCase = new ListarTodosOsServicosUseCase(this.servicoRepository)
        this.listarTodosKitsDeServicosUseCase = new ListarTodosKitsDeServicosUseCase(this.kitDeServicosRepository)
        this.listarTodosCartoesDoUsuarioUseCase = new ListarTodosCartoesDoUsuarioUseCase(this.cartaoDeServicosRepository)
        this.utilizarServicoUseCase = new UtilizarServicoUseCase(this.detalheDaCompraRepository)
        this.listarRecompensasDoUsuarioUseCase = new ListarRecompensasDoUsuarioUseCase(this.recompensaRepository)
        this.utilizarRecompensaUseCase = new UtilizarRecompensaUseCase(this.recompensaRepository)
        this.adminRepository = new AdminRepository(this.databaseService)
    }

    async initialize() {
        await this.databaseConnection.initialize();
    }
}

module.exports = DependencyContainer;