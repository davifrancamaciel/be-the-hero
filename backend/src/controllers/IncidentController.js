const connection = require('../database/connection')

const { INCIDENTS, ONGS } = require('../consts')

module.exports = {
  async create (request, response) {
    const { title, description, value } = request.body
    const ong_id = request.headers.authorization

    const result = await connection(INCIDENTS).insert({
      title,
      description,
      value,
      ong_id
    })
    const id = result[0]
    return response.json({ id })
  },

  async index (request, response) {
    const { page = 1 } = request.query

    const [count] = await connection(INCIDENTS).count()
    const incidents = await connection(INCIDENTS)
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        `${INCIDENTS}.*`,
        `${ONGS}.name`,
        `${ONGS}.email`,
        `${ONGS}.whatsapp`,
        `${ONGS}.city`,
        `${ONGS}.uf`
      ])

    response.header('X-Total-Count', count['count(*)'])

    return response.json(incidents)
  },
  async delete (request, response) {
    const { id } = request.params
    const ong_id = request.headers.authorization

    const incident = await connection(INCIDENTS)
      .where('id', id)
      .select('ong_id')
      .first()

    if (incident && incident.ong_id != ong_id) {
      return response.status(401).json({ operation: 'Opetarion not permited' })
    }

    await connection(INCIDENTS)
      .where('id', id)
      .delete(incident)

    return response.status(204).send()
  }
}
