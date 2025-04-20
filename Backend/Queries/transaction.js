import express from 'express'
import {Sequelize, DataTypes } from 'sequelize'




const Transaction = () => 
{
    const transaction = express.Router() 
    const sequelize = new Sequelize("Products", "root", "password", 
        {
            host:"localhost", 
            dialect: "mysql"
        }
    )


    const Transactions  = sequelize.define("Transactions", 
        {
            transactionId:{
                type:DataTypes.INTEGER, 
                primaryKey: true,
                autoIncrement:true 
            }, 
            customerId:{
                type:DataTypes.INTEGER, 
                allowNull: false, 

            },
            amount:
            {
                type: DataTypes.INTEGER, 
                allowNull: false
            },  
            item:
            {
                type: DataTypes.STRING, 
                allowNull: false
            },
            method:{
                type: DataTypes.STRING, 
                allowNull:false 
            }, 
            status:
            {
                type: DataTypes.STRING, 
                allowNull:true
            }
        },
        {
            tableName:"transactions", 
            timestamps: false
        }
    )
    sequelize.sync()
    .then((res) => console.log("Connected to transaction"))


    transaction.get("/", async(req, res) => 
    {
        try{
            const selects = await Transactions.findAll() 
            return res.status(200).json(selects)
        }
        catch{
            console.log("Error getting transaction")
            return res.status(500).json({message: "Error connecting to transaction"})
        }
    })
  
    transaction.post("/post", async(req, res) => 
    {
        try{
            const {customerId, amount, item, method }  = req.body
            let status = "Pending"
            const inserts = await Transactions.create(
                {
                    customerId, amount, item, method, status
                }
            )
            return res.status(200).json(inserts)
        }
        catch{
            console.log(" Error posting to transaction")
            return res.status(500).json({message: "Error posting to transaction"})
        }


    })
    transaction.delete("/deletes/:id", async (req, res) => 
    {
        const transactionId = req.params.id
        try{
            const deletes = await Transactions.destroy({ 
                where:{
                    transactionId: transactionId
                }
            })
            return res.status(200).json(deletes)

        }
        catch{
            (err)=>
                {
                    console.log("Error on delete", err)
                    return res.status(500).json({message: `Error deleting ${err}`})
                }
        }
    }
    )



    return transaction
}




export default Transaction