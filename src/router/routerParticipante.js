import { Router } from "express";
import conn from '../config/conn.js'; 

const router = Router();


router.post('/', (req, res) => {
    const { nome, cargo, telefone, palestrante_id } = req.body; 

    if (!nome || !cargo || !telefone || !palestrante_id) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const sql = `INSERT INTO participantes (participante_id, nome, cargo, telefone, palestrante_id) VALUES (?, ?, ?, ?, ?)`;
    const participanteId = generateId(); 

    conn.query(sql, [participanteId, nome, cargo, telefone, palestrante_id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao criar participante." });
        }
        res.status(201).json({ message: "Participante criado com sucesso", id: participanteId });
    });
});

router.get('/', (req, res) => {
    const sql = `SELECT * FROM participantes`;

    conn.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar participantes." });
        }
        res.status(200).json(results);
    });
});

export default router;
