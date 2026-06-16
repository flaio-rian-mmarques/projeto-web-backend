import { z } from 'zod';

export const pedidosDTO = z.object({
    servicoId: z.number().positive('O id precisa ser válido!')
});