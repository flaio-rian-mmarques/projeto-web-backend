import { int } from "drizzle-orm/mysql-core";
import { sqliteTable, text, integer, SQLiteSelectQueryBuilderBase } from "drizzle-orm/sqlite-core";

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

export const servicos = sqliteTable('servicos', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    titulo: text('titulo').notNull(),
    descricao: text('descricao').notNull(),
    preco: integer('preco').notNull(),
    prazoDias: integer('prazo_dias').notNull(),
    
});