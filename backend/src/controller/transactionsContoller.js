import { sql } from "../config/db.js";
export async function getTransactionsByUserId(req, res) {
  try {
    const { userId } = req.params;
    const transactions =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
}
export async function createTransactions(req, res) {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !category || !user_id || amount === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transactions =
      await sql`INSERT INTO transactions(user_id,title,category,amount) VALUES (${user_id},${title},${category},${amount}) RETURNING * `;

    res.status(201).json(transactions[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
}
export async function deleteTransctionById(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      res.status(400).json({ message: "Transaction Invalid" });
    }
    const result = await sql`DELETE FROM transactions WHERE id = ${id} `;

    if (result.length === 0) {
      res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction Delete successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
}
export async function getTransactionsSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;

    const balanceResult =
      await sql`SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userId} `;
    const incomeResult =
      await sql`SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0`;
    const expensesResult =
      await sql`SELECT COALESCE(SUM(amount),0) as expense FROM transactions WHERE user_id = ${userId} AND amount < 0`;

    // SELECT
    // SUM(amount) AS balance,
    // COALESCE(SUM(CASE WHEN category = 'income' THEN amount ELSE 0 END),0) AS income,
    // COALESCE(SUM(CASE WHEN category = 'expense' THEN amount ELSE O END),0) AS expenses
    // FROM transactions WHERE user_id = ${userId}

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expensesResult[0].expense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
}
