const express = require('express')
const { celebrate, Joi, Segments } = require('celebrate')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const { INCIDENTS_ROUTE, ONGS_ROUTE } = require('./consts')

const routes = express.Router()

routes.post(`/sessions`, SessionController.create)

routes.get(`/${ONGS_ROUTE}`, OngController.index)
routes.post(
  `/${ONGS_ROUTE}`,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngController.create
)

routes.get(
  `/${INCIDENTS_ROUTE}`,
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentController.index
)
routes.post(`/${INCIDENTS_ROUTE}`, IncidentController.create)
routes.delete(
  `/${INCIDENTS_ROUTE}/:id`,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    }).unknown()
  }),
  IncidentController.delete
)

routes.get(
  `/profile`,
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
)

module.exports = routes
