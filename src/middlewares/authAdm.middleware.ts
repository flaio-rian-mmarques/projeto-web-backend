import type { Request, Response, NextFunction } from "express";

export const somenteAdmin = (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).usuario.role;

    if (role !== 'admin') {
        return res.status(403).json({ erro: 'Acesso negado.' });
    }

    next();
};