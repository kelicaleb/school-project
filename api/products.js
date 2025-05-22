import { sequelize, DataTypes } from "./_utils/db.js";

/**
 * NOTE: File uploads using multer or local file storage DO NOT work on Vercel serverless functions.
 * Vercel's filesystem is ephemeral and not shared across requests.
 * For product photos or other uploads, use a third-party storage service (e.g., AWS S3, Cloudinary).
 * Your React frontend should upload images directly to the storage provider, then
 * pass back the resulting image URL to your API as part of the product data.
 */

// Define Goods model
const Goods = sequelize.define(
  "Goods",
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "Goods",
    timestamps: false,
  }
);

export default async function handler(req, res) {
  await sequelize.sync(); // For demo only

  if (req.method === "GET") {
    // GET /api/products
    try {
      const results = await Goods.findAll();
      return res.status(200).json(results);
    } catch {
      return res
        .status(500)
        .json({ message: "Error fetching data from Goods", success: false });
    }
  }

  if (req.method === "POST") {
    // POST /api/products
    // Expects JSON body: { serialNumber, item, image, category, stock, price }
    // The "image" field must be an externally hosted URL (not a file upload)
    try {
      const { serialNumber, item, image, category, stock, price } = req.body;

      if (!image || !image.startsWith("http")) {
        return res
          .status(400)
          .json({ message: "image must be a valid external URL", success: false });
      }

      const result = await Goods.create({
        serialNumber,
        item,
        image,
        category,
        stock,
        price,
      });

      return res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: {
          productId: result.productId,
          serialNumber,
          item,
          image,
          category,
          stock,
          price,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server error" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

