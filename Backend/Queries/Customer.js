import express from 'express'
import {Sequelize, DataTypes}  from 'sequelize'
import bcrypt from 'bcrypt'




const Customer = () => 
{
    const customer = express.Router()
    const sequelize = new Sequelize("Products", "root", "password", 
        {
            host:"localhost", 
            dialect:"mysql"
        }
    )
    const Customers = sequelize.define("Customers", {
        customerId:
        {
            type:DataTypes.STRING, 
            autoIncrement:true, 
            primaryKey:true
        }, 
        email:{
            type:DataTypes.STRING, 
            allowNull: false
        }, 
        username:{
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        password:{
            type:DataTypes.STRING, 
            allowNull: false
        },
        phoneNumber:{
            type:DataTypes.STRING, 
            allowNull:false
        },
        dob:
        {
            type:DataTypes.DATE, 
            allowNull: false
        }, 
        gender:{
            type:DataTypes.STRING, 
            allowNull:false
        },
        theme:{
            type:DataTypes.STRING, 
            allowNull:false
        } 

    }, 
{
    tableName:"Customer", 
    timestamps:false
})
sequelize.sync()
.then(() => console.log("Connected to Customer"))


customer.get("/", async(req, res) =>
{
    try{
        const selects = await Customers.findAll()
        return res.status(200).json(selects)

    }
    catch{
        console.log("Error selecting data")
        return res.status(500).json({message: "Error fetching data"})
    }
})
customer.post("/posts",async (req, res) => 
{
    try{
        const { email, username, password,  phoneNumber,  dob, gender, theme} = req.body
        const salt = await  bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        console.log(hash)

        const inserts = Customers.create({
         email, username, password:hash, phoneNumber, dob, gender, theme
        })
        console.log("user has been created")
        return res.status(200).json(inserts)

    }
    catch{
        console.log("Error posting data")
        return res.status(500).json({message: "Error posting data"})
    }
})
customer.post("/login", async(req, res) => 
{   
    const {username, password} = req.body
    try{
        const check = await Customers.findOne({
            where:
            {
                username
            }
        })
        console.log("this is check",check.username)
  
       const isMatching = await bcrypt.compare(password, check.password)
       console.log(isMatching)
       if(isMatching && username === check.username)
       {
        console.log("Logged in successfully")
        return res.status(200).json({logging: true})
       }
       else{ 
        console.log("Password or username is not matching")
        return res.status(400).json({logging: false})
       }
     
 }
    catch{
        console.log("Error authenticating")
        return res.status(500).json({logging:false})
    }
})

    return customer 
}


export default Customer