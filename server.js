import express from "express";
import fetch from "node-fetch";
import fs from "fs";

const app = express();
app.use(express.json());

const BLING_TOKEN = process.env.BLING_TOKEN;

async function fetchAllContacts() {
  let page = 1;
  const limit = 100;
  let allContacts = [];
  let hasMore = true;

  while (hasMore) {
    const url = `https://www.bling.com.br/Api/v3/contacts?page=${page}&limit=${limit}`;
    console.log("Buscando página:", page);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${BLING_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      hasMore = false;
    } else {
      allContacts = allContacts.concat(data.data);
      page++;
      hasMore = data.page < data.totalPages;
    }
  }

  return allContacts;
}

// Endpoint para sincronizar contatos
app.get("/sincronizar-contatos", async (req, res) => {
  try {
    const contacts = await fetchAllContacts();

    // Salvar em arquivo local (pode ser CSV depois)
    fs.writeFileSync("contatos.json", JSON.stringify(contacts, null, 2));
    res.json({ message: "Contatos sincronizados com sucesso!", total: contacts.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao sincronizar contatos" });
  }
});

app.listen(10000, () => console.log("Servidor rodando na porta 10000"));
