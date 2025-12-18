function status(requestAnimationFrame, response) {
  response.status(200).json({ chave: "Resposta maneira irmão" });
}

export default status;
