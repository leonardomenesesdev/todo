const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Aqui está o ponto chave!
    req.usuario = decoded;

    next();
  } catch (erro) {
    return res.status(401).json({ erro: "Token inválido" });
  }
}

module.exports = authMiddleware;
