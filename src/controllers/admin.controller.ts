import type { Request, Response } from 'express';
import { db } from '../db/client.js';
import { servicos } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const listarTodosServicos = async (req: Request, res: Response) => {
    try {
        const todosServicos = db.select().from(servicos).all();

        return res.status(200).json({
            mensagem: 'Relatório gerado com sucesso.',
            total: todosServicos.length,
            servicos: todosServicos
        });
    } catch (error: any) {
        return res.status(500).json({ erro: 'Erro ao buscar o relatório de serviços' });
    }
};

export const deletarServico = async (req: Request, res: Response) => {
    try {
        const servicoId = parseInt(req.params.id as string);

        const servicoDeletado = db.delete(servicos)
            .where(eq(servicos.id, servicoId))
            .returning()
            .get;
        
        if (!servicoDeletado) {
            return res.status(404).json({ erro: 'Serviço não encontrado no banco de dados.'});
        }

        return res.status(200).json({
            mensagem: `O servico '${servicoDeletado}' foi removido pela moderação.`,
            servico_removido: servicoDeletado
        });
    } catch (error: any) {
        return res.status(500).json({ erro: 'Erro ao deletar o serviço' });
    }
};