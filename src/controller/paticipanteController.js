import express from 'express';
import conn from '../config/conn.js';

const router = express.Router();


router.post('/registrar', (req, res) => {
    const { nome, email } = req.body; 
    const sql = 'INSERT INTO participantes (participante_id, nome, email) VALUES (?, ?, ?)';
    const participanteId = generateId(); 

    conn.query(sql, [participanteId, nome, email], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Participante registrado com sucesso", id: participanteId });
    });
});

export default router; 