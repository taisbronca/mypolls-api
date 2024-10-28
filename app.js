import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDatabase from "./src/database/database.js";
import router from "./src/routes/index.js";

const app = express();

connectDatabase();

const allowedOrigins = [process.env.CLIENT_URL, process.env.CLIENT_URL_PROD];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
  res.send('API está funcionando!'); // Para verificar se o servidor está ativo
});

export default app;