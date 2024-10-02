import express from 'express';
import conn from '../config/conn.js';

const router = express.Router();

const validarDadosEvento = (titulo, data) => {
    if (!titulo || !data) {
        return { valido: false, mensagem: 'Título e data são obrigatórios' };
    }
    return { valido: true };
};

router.post('/criar', (req, res) => {
    const { titulo, data, palestrantesId } = req.body; 

    const { valido, mensagem } = validarDadosEvento(titulo, data);
    if (!valido) {
        return res.status(400).json({ error: mensagem });
    }

    const sql = 'INSERT INTO eventos (titulo, data) VALUES (?, ?)';

    conn.query(sql, [titulo, data], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar evento: ' + err.message });
        }

        const eventoId = result.insertId;
    
        if (palestrantesId && palestrantesId.length > 0) {
            const insertPalestrantes = palestrantesId.map(id => [eventoId, id]);
            const sqlPalestrantes = 'INSERT INTO eventos_palestrantes (evento_id, palestrante_id) VALUES ?';
            conn.query(sqlPalestrantes, [insertPalestrantes], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro ao associar palestrantes: ' + err.message });
                }
                res.status(201).json({ message: 'Evento criado com sucesso', id: eventoId });
            });
        } else {
            res.status(201).json({ message: 'Evento criado com sucesso', id: eventoId });
        }
    });
});

    router.get('/agenda', (req, res) => {
    const sql = 


    conn.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao listar eventos: ' + err.message });
        }
        res.status(200).json(results);
    });
});

export default router;