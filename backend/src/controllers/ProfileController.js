const connection = require('../database/connection')

const { INCIDENTS } = require('../consts')

module.exports = {
  async index (request, response) {
    const ong_id = request.headers.authorization
    const incidents = await connection(INCIDENTS)
      .where('ong_id', ong_id)
      .select('*')
    console.log('passou')
    return response.json(incidents)
  }
}
