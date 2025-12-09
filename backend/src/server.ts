import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Wishlist API - Luizalabs" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

export default app;
