import express from 'express'
import {Sequelize, DataTypes } from 'sequelize'



const Login = () => 
{
  const login = express.Router()
  const sequelize = new Sequelize("Products", "root", "password", 
    {
        host:"localhost", 
        dialect:"mysql"
    }
  )
  const Logins = sequelize.define("Logins", 
    {
        loginId:{
            type: DataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:true
        }, 
        gender: 
        {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        username:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        tableName:"Login", 
        timestamps:false
    }
  )
  sequelize.sync()
  .then(() => console.log("Connected successfully"))


  login.get("/", async (req, res) => 
{
    try{
        const selects = await Logins.findAll()
        return res.status(200).json(selects)

    }
    catch{
        console.log("Error fecthing data")
        return res.status(500).json({message:"Error fetching data from Login "})
    }
})
login.post("/posts", async (req, res) => 
{
    try{
        const {gender, username } = req.body
        console.log(username)
        const inserts = await Logins.create(
            {
                gender, 
                username
            }
        )
        return res.status(200).json(inserts)
    }
    catch{
        console.log("Error posting data")
        return res.status(500).json({message:"Error posting data"})
    }
})


  
  return login
}




export default Login 