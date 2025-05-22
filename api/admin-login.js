import { sequelize, DataTypes } from "./_utils/db.js";
import bcrypt from "bcrypt";

// Define the Admin model
const Admin = sequelize.define(
  "Admin",
  {
    adminId: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Admin",
    timestamps: false,
  }
);

export default async function handler(req, res) {
  await sequelize.sync();

  // ADMIN LOGIN: POST /api/admin-login?login=1 with { username, password }
  if (req.method === "POST" && req.url.includes("login")) {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ where: { username } });
      if (!admin) {
        return res.status(404).json({ message: "Wrong user name" });
      }
      const checkPassword = await bcrypt.compare(password, admin.password);
      if (admin.username !== "" && checkPassword) {
        return res.status(200).json([{ message: "login" }, { login: true }]);
      } else {
        return res
          .status(400)
          .json([{ message: "Wrong password" }, { login: false }]);
      }
    } catch {
      return res.status(404).json({ message: "Wrong user name" });
    }
  }

  // REGISTER ADMIN: POST /api/admin-login with { username, password }
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const postAdmin = await Admin.create({
        username,
        password: hash,
      });
      return res.status(200).json(postAdmin);
    } catch {
      return res
        .status(401)
        .json({ Error: "Error posting data to Admin" });
    }
  }

  // GET: get all admins
  if (req.method === "GET") {
    try {
      const getDataAdmin = await Admin.findAll();
      return res.status(200).json(getDataAdmin);
    } catch {
      return res
        .status(500)
        .json({ message: "Error getting data from admin" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

/**
 * To log in as admin from your React frontend, use:
 *   fetch("/api/admin-login?login=1", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ username, password })
 *   })
 */

