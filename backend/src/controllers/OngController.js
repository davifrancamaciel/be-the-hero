const connection = require('../database/connection')
const generateUniqueId = require('../utils/getenerateUniqueId')
const { ONGS } = require('../consts')

module.exports = {
  async create (request, response) {
    const { name, email, whatsapp, city, uf } = request.body

    const id = generateUniqueId( )

    await connection(ONGS).insert({
      id,
      name,
      email,
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
