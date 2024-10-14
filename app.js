import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDatabase from "./src/database/database.js";
import router from "./src/routes/index.js";

const app = express();

connectDatabase();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(router);

export default app;