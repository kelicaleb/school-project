import express from 'express'
import { Sequelize, DataTypes}  from 'sequelize'


const Purchase = () => 
{
 const purchase = express.Router() 
 const sequelize = new Sequelize("Products", "root", "password", 
    {
        host:"localhost", 
        dialect: "mysql", 
        
    }
 )
 const Purchases = sequelize.define("Purchases" , 
    {
        purchaseId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        images:{
            type:DataTypes.STRING, 
            allowNull: false
        }, 
        price:
        {
            type:DataTypes.DECIMAL, 
            allowNull: false
        }, 
        amount:
        {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        total:
        {
            type: DataTypes.DECIMAL, 
            allowNull: false
        },
        title:
        {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        phoneNumber:
        {
            type: DataTypes.STRING, 
            allowNull: false
        }
    },
    {
        tableName:"Purchased", 
        timestamps:false,
    }
 )
 sequelize.sync()
 .then(()=> console.log("Connected succefully"))
 .catch((err) => console.log("there is an error that has occured", err))

 purchase.get("/", async (req, res) => 
{
    try{
        const selects = await Purchases.findAll()
        return res.status(200).json(selects)
    }
    catch{
        console.log("Error selecting data")
        return  res.status(500).json({message: "Error fetching data"})
    }
})
purchase.post("/posts", async  (req, res) => 
{
    try{
        const {images, price, amount, total, title, phoneNumber } = req.body
        const inserts = await Purchases.create(
        {images, price,amount, total, title, phoneNumber })
        return  res.status(200).json(inserts)
        
    }
    catch{
        console.log('Error posting data')
        res.status(500).json({message: "error posting data"})
    }
})
purchase.delete("/delete/:id", async(req, res) => 
{
    const id = req.params.id 
    console.log(id)
    try{
        const deletes = await Purchases.destroy({
            where:
            {
                purchaseId: id
            }
        })
        return res.status(200).json(deletes)
    }
    catch{
        res.status(500).json({message: 'Error deleting'})
        console.log("Error deleting")
    };
})
purchase.patch("/patches/:id", async (req, res) => 
{
    try{
        const id = req.params.id 
        const {total} = req.body
        console.log(id, total)
        const purchaseId = await  Purchases.findByPk(id)
        if(!purchaseId){
            console.log("Id not found")
            return res.status(500).json({message :"Id is not found"})
        }
        else{
            const updates = await Purchases.update({total} , 
                {
                    where:{
                        purchaseId: id
                    }
                }
            )
            console.log("updated successfully")
            return res.status(200).json(updates);
        }
    }
    catch{
        console.log("Error updating total")
        res.status(500).json({message: "Error in updating total"})

    }
})




 return purchase
}



export default Purchase