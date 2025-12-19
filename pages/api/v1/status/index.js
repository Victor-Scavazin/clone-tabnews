import database from "infra/database";

async function status(request, response) {
  const result = await database.query("SELECT 1+1");
  response.status(200).json({ chave: "Resposta maneira irmão" });
}

export default status;
