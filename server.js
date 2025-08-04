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
    let cnpj = req.query.cnpj;
    if (!cnpj) return res.status(400).json({ error: "CNPJ é obrigatório" });

    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, "").padStart(14, "0");

    const url = `https://www.bling.com.br/Api/v3/contacts?cnpj=${cnpj}&types=client,supplier`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${BLING_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (data.error || !data.data || data.data.length === 0) {
      return res.json({ existe: false, mensagem: "Cliente não encontrado no Bling", cnpj });
    }

    const cliente = data.data[0];
    res.json({
      existe: true,
      cliente: {
        nome: cliente.name,
        cnpj: cliente.cnpj,
        cidade: cliente.city,
        status: cliente.status
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro na consulta ao Bling" });
  }
});

app.listen(10000, () => console.log("Servidor rodando na porta 10000"));
