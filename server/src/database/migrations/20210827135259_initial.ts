import { Knex } from 'knex';

const tableName = 'notes';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments();
    t.string('title', 100).notNullable();
    t.text('description');
    t.string('userId', 255).unique();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
