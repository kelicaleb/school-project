import { sequelize, DataTypes } from "./_utils/db.js";

// Define Transactions model
const Transactions = sequelize.define(
  "Transactions",
  {
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Pending",
    },
  },
  {
    tableName: "transactions",
    timestamps: false,
  }
);

export default async function handler(req, res) {
  await sequelize.sync(); // Consider moving elsewhere in production
  
  if (req.method === "GET") {
    // GET /api/transaction
    try {
      const result = await Transactions.findAll();
      return res.status(200).json(result);
    } catch {
      return res.status(500).json({ message: "Error connecting to transaction" });
    }
  } else if (req.method === "POST") {
    // POST /api/transaction
    try {
      const { customerId, amount, item, method } = req.body;
      let status = "Pending";
      const created = await Transactions.create({
        customerId,
        amount,
        item,
        method,
        status,
      });
      return res.status(200).json(created);
    } catch {
      return res.status(500).json({ message: "Error posting to transaction" });
    }
  } else if (req.method === "DELETE") {
    // DELETE /api/transaction?id=...
    const { id } = req.query;
    try {
      const deleted = await Transactions.destroy({
        where: { transactionId: id },
      });
      return res.status(200).json(deleted);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error deleting transaction: ${err}` });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

/**
 * Vercel Environment Variables you must set (in the Vercel dashboard):
 * - DB_HOST: hostname for MySQL
 * - DB_USER: MySQL user
 * - DB_PASSWORD: MySQL password
 * - DB_NAME: database name
 * 
 * Do NOT commit your .env with secrets—store everything sensitive using Vercel’s environment settings.
 */

