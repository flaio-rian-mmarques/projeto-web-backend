import type { Request, Response } from 'express';
import { db } from '../db/client.js';
import { servicos } from '../db/schema.js';
import { servicosDTO } from '../dtos/servicos.dto.js';

export const criarServico = async (req: Request, res: Response) => {
    try {
        const dados = servicosDTO.parse(req.body);

        console.log("DADOS DO TOKEN:", (req as any).usuario);

        const provedorId = (req as any).usuario.id;
        const role = (req as any).usuario.role;

        if (role !== 'provedor') {
            return res.status(403).json({ erro: 'Apenas provedores podem criar serviços' });
        }

        const novoServico = db.insert(servicos).values({
            titulo: dados.titulo,
            descricao: dados.descricao,
            preco: dados.preco,
            prazoDias: dados.prazoDias,
            provedorId: provedorId,
        }).returning().get();

        return res.status(201).json({
            mensagem: 'Serviço publicado com sucesso!!',
            servico: novoServico
        });
    } catch (error: any) {
        return res.status(400).json({ erro: error.errors || error.message});
    }
};