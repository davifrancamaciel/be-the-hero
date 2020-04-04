const { ONGS_ROUTE } = require('../../src/consts')
const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be able to create to create a new ONG', async () => {
    const response = await request(app)
      .post(`/${ONGS_ROUTE}`)
      //.set('Authorization','1c7b5492')
      .send({
        name: 'APAD2',
        email: 'conatto@apad.com.br',
        whatsapp: '24993954479',
        city: 'Petrópolis',
        uf: 'RJ'
      })
    console.log(response.body)
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})
