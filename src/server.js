import express from 'express';
import conn from './config/conn.js';
import "dotenv/config";

import routerPalestrante from './router/routerPalestrante.js';
import routerParticipante from './router/routerParticipante.js';

import "./models/palestranteModel.js";
import "./models/participanteModel.js";

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());


const validarPalestrante = (req, res, next) => {
    const { nome, cargo, telefone } = req.body;
    if (!nome || !cargo || !telefone) {
        return res.status(400).json({ error: "Nome, cargo e telefone são obrigatórios." });
    }
    
};

app.use('/palestrante', routerPalestrante);
app.use('/participantes', routerParticipante);


app.get("*", (request, response) => {
    response.status(404).json({ message: "Rota não encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

conn.getConnection((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        process.exit(1);
    }
    console.log('Conectado ao MySQL com sucesso!');
}); 