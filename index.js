import express from "express";
import connectDatabase from "./src/database/database.js";
import dotenv from "dotenv";

import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import pollRoute from './src/routes/poll.route.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/poll", pollRoute);

app.listen (port, () => console.log(`Server running at: ${port}`));