import { int } from "drizzle-orm/mysql-core";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// tabela de usuários | users table
export const usuarios = sqliteTable('usuarios', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    nome: text('nome').notNull(),
    email: text('email').notNull().unique(),
    senha: text('senha').notNull(),
    role: text('role', { enum: ['contratante', 'provedor', 'ADM'] }).notNull(),
    tecnologias: text('tecnologias'),
    criadoEm: integer('criadoEm', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});