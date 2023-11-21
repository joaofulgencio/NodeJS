class UsuarioRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }

    async inserirUsuario(nome) {
        try {
            const sql = `INSERT INTO usuarios (nome) VALUES ($1)`
            const params = [nome]
            return await this.databaseService.executeInsert(sql, params)
        } catch (error) {
            console.error('Erro ao inserir usuário:', error)
        }
    }

    async buscarTodosOsUsuarios() {
        console.log("executando Query")
        const sql = `SELECT * FROM usuarios`
        return await this.databaseService.execute(sql)
    }
}

module.exports = UsuarioRepository