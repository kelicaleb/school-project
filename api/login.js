import { sequelize, DataTypes } from "./_utils/db.js";

// Define Logins model
const Logins = sequelize.define(
  "Logins",
  {
    loginId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Login",
    timestamps: false,
  }
);

export default async function handler(req, res) {
  await sequelize.sync(); // For demonstration

  if (req.method === "GET") {
    // GET /api/login
    try {
      const result = await Logins.findAll();
      return res.status(200).json(result);
    } catch {
      return res.status(500).json({ message: "Error fetching data from Login" });
    }
  }

  if (req.method === "POST") {
    // POST /api/login
    try {
      const { gender, username, phoneNumber, customerId } = req.body;
      const inserts = await Logins.create({
        gender,
        username,
        phoneNumber,
        customerId,
      });
      return res.status(200).json(inserts);
    } catch {
      return res.status(500).json({ message: "Error posting data" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

