import { sequelize, DataTypes } from "./_utils/db.js";

// Define models
const Customer = sequelize.define(
  "Customer",
  {
    customerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Customer",
    timestamps: false,
  }
);

const Transactions = sequelize.define(
  "transactions",
  {
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "transactions",
    timestamps: false,
  }
);

// Define associations
Customer.hasMany(Transactions, { foreignKey: "customerId" });
Transactions.belongsTo(Customer, { foreignKey: "customerId" });

export default async function handler(req, res) {
  await sequelize.sync();

  if (req.method === "GET") {
    try {
      const result = await Customer.findAll({
        attributes: ["username"],
        include: [
          {
            model: Transactions,
            attributes: [
              "transactionId",
              "item",
              "amount",
              "method",
              "status",
            ],
          },
        ],
      });
      return res.status(200).json(result);
    } catch {
      return res
        .status(400)
        .json({ Error: "Error fetching data in table transactions or Customer" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

