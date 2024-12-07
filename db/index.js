const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: 5432,
        database: "shoots_db",
      }
);

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
};
