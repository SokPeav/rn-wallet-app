import { neon } from "@neondatabase/serverless";

import "dotenv/config";

// Create SQL connection to DB
export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
    //DECIMAL is for fix number digit. ex: 1000.2
    await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL, 
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
  } catch (error) {
    console.log(error);
    process.exit(1); //Status code 1 mean fail, 0 mean success
  }
}
