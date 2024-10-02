import { Router } from "express";
import conn from '../config/conn.js'; 

const router = Router();


router.post('/', (req, res) => {
    const { nome, expertise } = req.body; 

    const sql = `INSERT INTO palestrantes (palestrante_id, nome, expertise) VALUES (?, ?, ?)`;
    const palestranteId = generateId();

    conn.query(sql, [palestranteId, nome, expertise], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Palestrante criado com sucesso", id: palestranteId });
    });
});

router.get('/', (req, res) => {
    const sql = `SELECT * FROM palestrantes`;

    conn.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

export default router; 