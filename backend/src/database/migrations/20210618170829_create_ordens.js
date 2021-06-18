exports.up = function(knex) {
    return knex.schema.createTable('ordens', function (table) {
      table.increments();
  
      table.string('cliente').notNullable();
      table.string('marca').notNullable();
      table.string('modelo').notNullable();
      table.string('descricao').notNullable();
      table.string('status');
      table.decimal('valor').notNullable();
    
      table.string('at_id').notNullable();
  
      table.foreign('at_id').references('id').inTable('at');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('ordens');
  };
  