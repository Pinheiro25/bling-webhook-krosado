import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const BLING_TOKEN = process.env.BLING_TOKEN;

// Função para buscar contatos (somente a primeira página, para debug)
async function fetchAllContacts() {
  const url = `https://www.bling.com.br/Api/v3/contacts?page=1&limit=10`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${BLING_TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  return data;
}

// Endpoint para sincronizar (debug: mostra a resposta crua da API)
app.get("/sincronizar-contatos", async (req, res) => {
  try {
    const data = await fetchAllContacts();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao sincronizar contatos" });
  }
});

app.get("/", (req, res) => {
  res.send("API do Render rodando!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
