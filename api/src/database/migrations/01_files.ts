import Knex from "knex";

export async function up(knex: Knex) {
	return knex.schema.createTable("files", (table) => {
		table.increments("id").primary();
		table.string("fileUrl").notNullable();
		table.string("name").notNullable();
		table.string("fileName").notNullable();
		table.integer("size").notNullable();
		// date in UTC format
		table.timestamp("uploaded_at").defaultTo(knex.fn.now());
		table.integer("user").notNullable();
		table.foreign("user").references("id").inTable("users").onDelete("CASCADE");
	});
}

export async function down(knex: Knex) {
	return knex.schema.dropTable("files");
}
