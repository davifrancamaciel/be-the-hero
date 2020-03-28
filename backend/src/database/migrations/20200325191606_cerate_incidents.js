const { INCIDENTS } = require('../../consts')

exports.up = function (knex) {
  return knex.schema.createTable(INCIDENTS, function (table) {
    // chave primaria auto incremento
    table.increments()
    // colunas
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.decimal('value').notNullable()
    // id chave estrangeira
    table.string('ong_id').notNullable()
    // relacionamento com a tabela ong
    table
      .foreign('ong_id')
      .references('id')
      .inTable('ongs')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(INCIDENTS)
}
