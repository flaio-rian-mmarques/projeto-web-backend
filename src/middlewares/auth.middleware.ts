import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SEGREDO_JWT = 'Y9juy1abcFiu7YgLKOBLeyCV3cxHBB6fRcs31Zq4VugsQgKYucQk3frjqw89yYbt3YFgBab8MCzp7yZJBJJKiFvduSPDuhf'

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
    }

    const chunks = authHeader.split(' ');
    const token = chunks[1];

    if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. Token mal formatado.' });
    }

    try{
        const payload = jwt.verify(token, SEGREDO_JWT);
        (req as any).usuario = payload;
        next();
    } catch (error) {
        return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }
};