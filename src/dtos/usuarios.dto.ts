import { z } from 'zod';

export const cadastroDTO = z.object({
    nome: z.string(),
    email: z.string().email('Email invalido'),
    senha: z.string().min(6, 'A senha precisa ter, no mínimo, 6 caracteres'),
    tipo: z.enum(['contratante', 'provedor', 'ADM']),
    tecnologias: z.string().optional(),
});

export const loginDTO = z.object({
    email: z.string().email('Email inválido'),
    senha: z.string().min(1, 'A senha é obrigatória'),
})