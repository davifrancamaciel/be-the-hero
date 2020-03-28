const connection = require('../database/connection')

const { ONGS } = require('../consts')

module.exports = {
  async create (request, response) {
    const { id } = request.body

    const ong = await connection(ONGS)
      .where('id', id)
      .select('name')
      .first()

    if (!ong) {
      return response.status(400).json({ error: 'No ONG found whith this ID' })
    }

    return response.json(ong)
  }
}
