import type { Request, Response } from 'express';
import { db } from '../db/client.js';
import { pedidos } from '../db/schema.js';
import { pedidosDTO } from '../dtos/pedidos.dto.js';
import { eq, and } from 'drizzle-orm'
import { MercadoPagoConfig, Preference } from 'mercadopago';

const clienteMP = new MercadoPagoConfig({ accessToken: 'APP_USR-4428143075776157-061522-a7c80e234ff70c0f1f2c75e604c5401e-3476218144' });

export const pagarPedido = async (req: Request, res: Response) => {
    try {
        const pedidoId = parseInt(req.params.id as string);
        const contratanteId = (req as any).usuario.id;
        const role = (req as any).usuario.role;
        
        if (role !== 'contratante') {
            return res.status(403).json({ erro: 'Apenas contratantes podem realizar o pagamento pelo serviço!' });
        }

        const precoServico = 150.00;
        const preferencia = new Preference(clienteMP);
        const respostaMP = await preferencia.create({
            body: {
                items: [
                    {
                        id: String(pedidoId),
                        title: 'Serviço na plataforma marketplace',
                        quantity: 1,
                        unit_price: precoServico,
                        currency_id: 'BRL'
                    }
                ],
                // notification_url: ''
            }
        });

        const pedidoAtualizado = db.update(pedidos)
            .set({ status: 'aguardando_pagamento' })
            .where(
                and(
                    eq(pedidos.id, pedidoId),
                    eq(pedidos.contratanteId, contratanteId)
                )
            )
            .returning()
            .get()
        
            if (!pedidoAtualizado) {
                return res.status(404).json({ erro: 'Pedido não encontrado ou não pertence a você' });
            }

            return res.status(200).json({
                mensagem: 'Cobrança gerada com sucesso!',
                link_do_pagamento: respostaMP.init_point,
                pedido: pedidoAtualizado
            });
    } catch (error: any) {
        console.error(error);
        return res.status(400).json({ erro: 'Erro ao processar integração com Mercado Pago' });
    }
}

export const criarPedido = async (req: Request, res: Response) => {
    try {
        const dados = pedidosDTO.parse(req.body);
        const contratanteId = (req as any).usuario.id;
        const role = (req as any).usuario.role;

        if (role !== 'contratante') {
            return res.status(403).json({ erro: 'Apenas contratantes podem criar um pedido' });
        }

        const novoPedido = db.insert(pedidos).values({
            servicoId: dados.servicoId,
            contratanteId: contratanteId,
        }).returning().get();

        return res.status(201).json({
            mensagem: 'Pedido criado com sucesso!!',
            pedido: novoPedido
        });
    } catch (error: any) {
        return res.status(400).json({ erro: error.errors || error.message });
    }
}