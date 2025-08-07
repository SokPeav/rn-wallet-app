import express from "express";
import {
    createTransactions,
    deleteTransctionById,
    getTransactionsByUserId,
    getTransactionsSummaryByUserId,
} from "../controller/transactionsContoller.js";

const router = express.Router();

router.get("/:userId", getTransactionsByUserId);

router.post("/", createTransactions);

router.delete("/:id", deleteTransctionById);

router.get("/summary/:userId", getTransactionsSummaryByUserId);

export default router;
