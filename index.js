const express = require('express');
const app = express();
app.use(express.json());

// Rota do webhook do Bling
app.post('/webhook/bling', (req, res) => {
    console.log("Webhook recebido do Bling:", req.body);
    res.sendStatus(200); // Confirma para o Bling que recebeu
});

// Rota de teste
app.get('/', (req, res) => {
    res.send('API do Talentos Virtuais funcionando!');
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
