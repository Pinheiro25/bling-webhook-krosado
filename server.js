import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const BLING_TOKEN = process.env.BLING_TOKEN;

// Rota de teste (já funcionando)
app.get("/", (req, res) => {
  res.send("API do Talentos Virtuais funcionando!");
});

// Rota para consulta de CNPJ
app.get("/consulta-id", async (req, res) => {
  try {
    const id = req.query.id;
    const url = `https://www.bling.com.br/Api/v3/contacts/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${BLING_TOKEN}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar por ID" });
  }
});


app.listen(10000, () => console.log("Servidor rodando na porta 10000"));
