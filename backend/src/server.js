import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { initDB } from "./config/db.js";
import transactionRoute from './routes/transactionRoute.js';
dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 100,
  statusCode: 429,
  message :"Too Many request, try again later"
});

//Midleware
app.use(limiter)
app.use(cors())
app.use(express.json());

app.use("/api/transactions",transactionRoute)

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("The server is running");
  });
});
