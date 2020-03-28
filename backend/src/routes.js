const express = require('express')
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const { INCIDENTS_ROUTE, ONGS_ROUTE } = require('./consts')

const routes = express.Router()

routes.post(`/sessions`, SessionController.create)

routes.get(`/${ONGS_ROUTE}`, OngController.index)
routes.post(`/${ONGS_ROUTE}`, OngController.create)

routes.get(`/${INCIDENTS_ROUTE}`, IncidentController.index)
routes.post(`/${INCIDENTS_ROUTE}`, IncidentController.create)
routes.delete(`/${INCIDENTS_ROUTE}/:id`, IncidentController.delete)

routes.get(`/profile`, ProfileController.index)

module.exports = routes
