const crypto = require('crypto')
const connection = require('../database/connection')

const { ONGS } = require('../consts')

module.exports = {
  async create (request, response) {
    const { name, email, whatsapp, city, uf } = request.body

    const id = crypto.randomBytes(4).toString('HEX')

    await connection(ONGS).insert({
      id,
      name,
      email,
      city,
      whatsapp,
      city,
      uf
    })

    return response.json({ id })
  },

  async index (request, response) {
    const ongs = await connection(ONGS).select('*')

    return response.json(ongs)
  }
}
