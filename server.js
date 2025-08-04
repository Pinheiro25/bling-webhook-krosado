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
app.get("/consulta-cnpj", async (req, res) => {
  try {
    const cnpj = req.query.cnpj;
    if (!cnpj) return res.status(400).json({ error: "CNPJ é obrigatório" });

    const url = `https://www.bling.com.br/Api/v3/contacts?cnpj=${cnpj}`;
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
    console.error(error);
    res.status(500).json({ error: "Erro na consulta ao Bling" });
  }
});

app.listen(10000, () => console.log("Servidor rodando na porta 10000"));
