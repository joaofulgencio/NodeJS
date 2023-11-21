const middleWareGlobal = (req, res, next) => {

    console.time('Requisição')
    console.log(`Método: ${req.method} URL: ${req.url}`)
    next()
    console.log('Finalizou')
    console.timeEnd('Requisição')
    
}

module.exports = middleWareGlobal