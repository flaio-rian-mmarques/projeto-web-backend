import { z } from 'zod';

export const servicosDTO = z.object({
    titulo: z.string().min(3, 'O serviço precisa ter um título válido!'),
    descricao: z.string().min(10, 'O serviço precisa ter uma descrição válida!'),
    preco: z.number().positive('O serviço precisa ter um preço válido!'),
    prazoDias: z.number().positive('O serviço precisa possuir um prazo válido em dias!'),
});