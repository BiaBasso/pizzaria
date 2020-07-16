// Método up é sempre responsável pela criação da tabela
exports.up = function(knex) {

    return knex.schema.createTable('pizza', function (table) {
        table.string('id').primary();
        table.string('size').notNullable();
        table.string('crustType').notNullable();
        table.string('flavor').notNullable();
        table.string('points').notNullable();
    });
};

// Método down serve para se der um problema o que precisa ser desfeito
exports.down = function(knex) {
  
    return knex.schema.dropTable('pizza');
};
