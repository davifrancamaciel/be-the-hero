const generateUniqueId = require('../../src/utils/getenerateUniqueId')

describe('Genetare Unique ID', () => {
  it('should genetare an unique id', () => {
    const id = generateUniqueId()

    expect(id).toHaveLength(8)
  })
})
