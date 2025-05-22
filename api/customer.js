import { sequelize, DataTypes } from "./_utils/db.js";
import bcrypt from "bcrypt";

// Define Customers model
const Customers = sequelize.define(
  "Customers",
  {
    customerId: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATE, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    theme: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "Customer",
    timestamps: false,
  }
);

export default async function handler(req, res) {
  await sequelize.sync(); // For demo/starter use

  // Auth (login) action: POST /api/customer?login=1, body: { username, password }
  if (req.method === "POST" && req.url.includes("login")) {
    try {
      const { username, password } = req.body;
      const user = await Customers.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ logging: false });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch && username === user.username) {
        return res.status(200).json({ logging: true });
      } else {
        return res.status(400).json({ logging: false });
      }
    } catch {
      return res.status(500).json({ logging: false });
    }
  }

  // Update password: PATCH /api/customer, body: { username, password }
  if (req.method === "PATCH") {
    try {
      const { username, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const result = await Customers.update(
        { password: hash },
        { where: { username } }
      );
      return res.status(200).json(result);
    } catch {
      return res.status(500).json({ message: "Error updating password" });
    }
  }

  // Get all customers: GET /api/customer
  if (req.method === "GET") {
    try {
      const result = await Customers.findAll();
      return res.status(200).json(result);
    } catch {
      return res.status(500).json({ message: "Error fetching data" });
    }
  }

  // Create/register customer: POST /api/customer, body: all customer fields
  if (req.method === "POST") {
    try {
      const { email, username, password, phoneNumber, dob, gender, theme } =
        req.body;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const inserts = await Customers.create({
        email,
        username,
        password: hash,
        phoneNumber,
        dob,
        gender,
        theme,
      });
      return res.status(200).json(inserts);
    } catch {
      return res
        .status(500)
        .json({ message: "Error posting data to Customer" });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "PATCH"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

/**
 * To LOGIN from your React frontend, use:
 *   fetch("/api/customer?login=1", {method:"POST", body: JSON.stringify({username, password}), headers:{'Content-Type':'application/json'}})
 *
 * Register, get all, and update password work via normal POST/GET/PATCH respectively at /api/customer.
 */

