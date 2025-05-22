import { sequelize, DataTypes } from "./_utils/db.js";

// Define Purchases model (should ideally move to _utils if reused)
const Purchases = sequelize.define(
  "Purchases",
  {
    purchaseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    images: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.DECIMAL, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false }
    // Add phoneNumber, etc. fields as needed
  },
  {
    tableName: "Purchased",
    timestamps: false,
  }
);

export default async function handler(req, res) {
  await sequelize.sync(); // Ideally, sync elsewhere, but fine for demo

  if (req.method === "GET") {
    // /api/purchase
    try {
      const selects = await Purchases.findAll();
      return res.status(200).json(selects);
    } catch {
      return res.status(500).json({ message: "Error fetching data" });
    }
  } else if (req.method === "POST") {
    // /api/purchase
    try {
      const { images, price, amount, total, title, phoneNumber } = req.body;
      const inserts = await Purchases.create({
        images,
        price,
        amount,
        total,
        title,
        phoneNumber
      });
      return res.status(200).json(inserts);
    } catch {
      return res.status(500).json({ message: "error posting data" });
    }
  } else if (req.method === "DELETE") {
    // /api/purchase?id=...
    const { id } = req.query;
    try {
      const deletes = await Purchases.destroy({
        where: { purchaseId: id }
      });
      return res.status(200).json(deletes);
    } catch {
      return res.status(500).json({ message: "Error deleting" });
    }
  } else if (req.method === "PATCH") {
    // /api/purchase?id=...
    const { id } = req.query;
    const { total } = req.body;
    try {
      const result = await Purchases.update({ total }, { where: { purchaseId: id } });
      return res.status(200).json(result);
    } catch {
      return res.status(500).json({ message: "Error updating total" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE", "PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

