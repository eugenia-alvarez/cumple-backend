const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// "Base de datos" en memoria (para empezar)
// Cambiá/añadí tokens y nombres como necesites.
const tokens = {
  "abc123": { usado: false, nombre: "Familia Gómez" },
  "def456": { usado: false, nombre: "Amigos de Ana" },
  "xyz789": { usado: false, nombre: "Martina" }
};

// GET /validar?token=abc123
app.get("/validar", (req, res) => {
  const token = req.query.token;

  if (!token || !tokens[token]) {
    return res.json({ estado: "invalido", mensaje: "❌ Código no válido." });
  }

  if (tokens[token].usado) {
    return res.json({ estado: "usado", mensaje: "⚠️ Este código ya fue utilizado." });
  }

  tokens[token].usado = true;
  return res.json({
    estado: "ok",
    mensaje: `✅ Bienvenidos ${tokens[token].nombre}, acceso permitido.`
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend listo en http://localhost:${PORT}`);
});
