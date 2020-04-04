const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const { errors } = require('celebrate')

const port = 3333
//iniciando a isntacia da aplicacao
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errors())

module.exports = app
console.log(`BACKEND rodando na porta ${port}`)
