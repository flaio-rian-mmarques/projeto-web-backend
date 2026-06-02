import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../db/client.js';
import { usuarios } from '../db/schema.js';
import { cadastroDTO, loginDTO } from '../dtos/usuarios.dto.js';

const SEGREDO_JWT = 'Y9juy1abcFiu7YgLKOBLeyCV3cxHBB6fRcs31Zq4VugsQgKYucQk3frjqw89yYbt3YFgBab8MCzp7yZJBJJKiFvduSPDuhf'

export const cadastrarUsuario = async (req: Request, res: Response) => {
    try {
        const dados = cadastroDTO.parse(req.body);
        const usuarioExistente = db.select().from(usuarios).where(eq(usuarios.email, dados.email)).get();
        if(usuarioExistente){
            return res.status(400).json({ erro: 'Este email já está em uso.' });
        }

        const senhaHash = await bcrypt.hash(dados.senha, 10);

        const novoUsuario = db.insert(usuarios).values({
            nome: dados.nome,
            email: dados.email,
            senha: senhaHash,
            role: dados.role,
            tecnologias: dados.tecnologias,
        }).returning({ id: usuarios.id, nome: usuarios.nome, role: usuarios.role }).get();

        return res.status(201).json({ mensagem: 'Conta criada com sucesso!', usuario: novoUsuario });
    } catch (error: any) {
        return res.status(400).json({ erro: error.errors || error.message });
    }
};

export const fazerLogin = async (req: Request, res: Response) => {
    try{
        const dados = loginDTO.parse(req.body);
        
        const usuario = db.select().from(usuarios).where(eq(usuarios.email, dados.email)).get();
        if (!usuario) {
            return res.status(401).json({erro: 'Usuário inexistente'});
        }

        const senhaValida = await bcrypt.compare(dados.senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({erro: 'Email ou senha inválida...'});
        }

        const token = jwt.sign(
            { id: usuario.id, role: usuario.role },
            SEGREDO_JWT,
            { expiresIn: '1d' }
        );

        return res.json({ mensage: 'Login bem-sucedido', token });
    } catch (error: any) {
        return res.status(400).json({ erro: error.errors || error.message });
    }
};

