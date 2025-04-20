import express from 'express'
import {Sequelize, DataTypes }  from 'sequelize'


function TableTransaction()
{
    const tableTransactions = express.Router()
    const sequelize = new Sequelize("Products", "root", "password", 
        {
            host:"localhost", 
            dialect:"mysql"
        }
    ) 
    const Customer = sequelize.define("Customer", 
        {
            customerId:{
                type:DataTypes.INTEGER, 
                primaryKey:true, 
                autoIncrement:true, 
                
            }, 
            username: 
            {
                type:DataTypes.STRING, 
                allowNull:false
            }
        }, 
        {
            tableName:"Customer", 
            tumestamps:false
        }
    )
    const Transactions = sequelize.define("transactions", 
        {
            transactionId:{
                type:DataTypes.INTEGER, 
                primaryKey:true, 
                autoIncrement:true
            }, 
            amount:{
                type:DataTypes.INTEGER, 
                allowNull: false

            }, 
            item:{
                type:DataTypes.STRING, 
                allowNull: false

            }, 
            method:{
                type:DataTypes.STRING, 
                allowNull:false

            }, 
            status:{
                type:DataTypes.STRING, 
                allowNull:false

            }

        }, 
        {
            tableName:"transactions", 
            timestamps:false
        }
    )
    sequelize.sync()
    .then((res) => console.log("Connected successfully to table transactions and customer "))
    tableTransactions.get("/", async (req, res) =>
    {
        try{
            Customer.hasMany(Transactions, {foreignKey: "customerId"})
            Transactions.belongsTo(Customer, {foreignKey:"customerId"})
            const result = await Customer.findAll({
                attributes:['username'], 
                include:[{
                    model:Transactions, 
                    attributes:['transactionid', 'item', 'amount', 'method', 'status']
                }]
            })
            return res.status(200).json(result)
        }
        catch 
        {
            console.error("Error fetching data")
            return res.status(400).json({Error:"Error fetching data in table transactions or Customer"})
        }
    })






    return tableTransactions
}



export default TableTransaction